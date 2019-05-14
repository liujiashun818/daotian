import React from 'react';
import {
  Button,
  Col,
  Collapse,
  DatePicker,
  Form,
  Icon,
  Input,
  message,
  Row,
  Select,
  Tooltip,
} from 'antd';

import Layout from '../../utils/FormLayout';
import api from '../../middleware/api';
import formatter from '../../utils/DateFormatter';
import validator from '../../utils/validator';
import FormValidator from '../../utils/FormValidator';

import Qiniu from '../../components/widget/UploadQiniu';
import BaseAutoComponent from '../../components/base/BaseAuto';

const FormItem = Form.Item;
const Option = Select.Option;
const Panel = Collapse.Panel;
const TextArea = Input.TextArea;

class NewAutoForm extends BaseAutoComponent {
  constructor(props) {
    super(props);
    this.state = {
      auto: [],
      brands: [],
      series: [],
      types: [],
      brands_name: '',
      series_name: '',
      types_name: '',
      outColor: [],
      auto_factory_id: '',
      vehicle_license_pic_front_files: [],
      vehicle_license_pic_back_files: [],
      vehicle_license_pic_front_progress: [],
      vehicle_license_pic_back_progress: [],
      autoTypeNameDisable: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { customer_id, auto_id } = this.props;
    this.getAutoBrands();
    this.getPurchaseAutoDetail(customer_id, auto_id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error(validator.text.hasError);
        return;
      }

      values.register_date = formatter.date(values.register_date);
      values.force_expire_date = formatter.date(values.force_expire_date);
      values.business_expire_date = formatter.date(values.business_expire_date);

      api.ajax({
        url: (!values._id ? api.auto.add() : api.auto.edit()),
        type: 'POST',
        data: values,
      }, data => {
        message.success('修改车辆成功');
        this.props.cancelModal();
        this.props.onSuccess(data.res.auto_id);
      });
    });
  }

  getPurchaseAutoDetail(customerId, autoId) {
    api.ajax({ url: api.auto.detail(customerId, autoId) }, data => {
      const detail = data.res.detail;
      const brandId = detail.auto_brand_id;
      const seriesId = detail.auto_series_id;

      this.setState({
        auto: detail,
        auto_factory_id: detail.auto_factory_id,
        brands_name: detail.auto_brand_name,
        series_name: detail.auto_series_name,
        types_name: detail.auto_type_name,
        autoTypeNameDisable: detail.auto_type_id > 0,
      });

      this.props.form.setFieldsValue({
        vehicle_license_pic_front: detail.vehicle_license_pic_front,
        vehicle_license_pic_back: detail.vehicle_license_pic_back,
      });

      this.getAutoSeries(brandId);
      this.getAutoTypes(seriesId);
      this.getAutoImages(detail);
    });
  }

  getAutoImages(auto) {
    if (auto.vehicle_license_pic_front) {
      this.getPrivateImageUrl('vehicle_license_pic_front', auto.vehicle_license_pic_front);
    }
    if (auto.vehicle_license_pic_back) {
      this.getPrivateImageUrl('vehicle_license_pic_back', auto.vehicle_license_pic_back);
    }
  }

  render() {
    const { formItem8_15, formItem4_19, selectStyle } = Layout;
    const { customer_id, form } = this.props;
    const { getFieldDecorator } = form;
    const {
      auto_factory_id,
      auto,
      brands,
      series,
      types,
      outColor,
    } = this.state;

    return (
      <Form className="form-collapse">
        {getFieldDecorator('_id', { initialValue: auto._id })(<Input type="hidden" />)}
        {getFieldDecorator('customer_id', { initialValue: customer_id })(<Input type="hidden" />)}
        {getFieldDecorator('intention_id', { initialValue: auto.intention_id })(<Input
          type="hidden" />)}
        {getFieldDecorator('auto_factory_id', { initialValue: auto_factory_id })(<Input
          type="hidden" />)}

        <Collapse defaultActiveKey={['1']}>
          <Panel header="基本信息" key="1">
            <Row>
              <Col span={12}>
                <FormItem label="车牌号" {...formItem8_15}>
                  {getFieldDecorator('plate_num', {
                    initialValue: auto.plate_num,
                    rules: FormValidator.getRulePlateNumber(true),
                    validatorTrigger: 'onBlur',
                  })(
                    <Input />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="品牌" {...formItem8_15}>
                  {getFieldDecorator('auto_brand_id', {
                    initialValue: auto.auto_brand_id,
                    rules: FormValidator.getRuleNotNull(),
                    validatorTrigger: 'onBlur',
                  })(
                    <Select
                      showSearch
                      onSelect={this.handleBrandSelect}
                      optionFilterProp="children"
                      placeholder="请选择品牌"
                      notFoundContent="无法找到"
                      searchPlaceholder="输入品牌"
                      {...selectStyle}
                    >
                      {brands.map(brand => <Option key={brand._id}>{brand.name}</Option>)}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <div className="form-line-divider" />

            <Row>
              <Col span={12}>
                <FormItem label="车系" {...formItem8_15}>
                  {getFieldDecorator('auto_series_id', { initialValue: auto.auto_series_id })(
                    <Select onSelect={this.handleSeriesSelect} {...selectStyle}>
                      <Option key="0">不限</Option>
                      {series.map(series => <Option key={series._id}>{series.name}</Option>)}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="车型" {...formItem8_15}>
                  {getFieldDecorator('auto_type_id', { initialValue: auto.auto_type_id })(
                    <Select onSelect={this.handleTypeSelect} {...selectStyle}>
                      <Option key="0">不限</Option>
                      {types.map(type => <Option
                        key={type._id}>{type.year} {type.version}</Option>)}
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="外观" {...formItem8_15}>
                  {getFieldDecorator('out_color', { initialValue: auto.out_color })(
                    <Select {...selectStyle}>
                      <Option key="0">不限</Option>
                      {outColor.map(color => <Option key={color._id}>{color.name}</Option>)}
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="车型名称" {...formItem8_15}>
                  {getFieldDecorator('auto_type_name', { initialValue: '' })(
                    <Input placeholder="请输入车型描述" disabled={this.state.autoTypeNameDisable} />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <div className="form-line-divider" />

            <Row>
              <Col span={12}>
                <FormItem label="车架号" {...formItem8_15}>
                  {getFieldDecorator('vin_num', { initialValue: auto.vin_num })(
                    <Input />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="发动机号" {...formItem8_15}>
                  {getFieldDecorator('engine_num', { initialValue: auto.engine_num })(
                    <Input />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="燃油" {...formItem8_15}>
                  {getFieldDecorator('energy_type', {
                    initialValue: auto.energy_type
                      ? auto.energy_type.toString()
                      : '-1',
                  })(
                    <Select {...selectStyle}>
                      <Option key="-1">未知</Option>
                      <Option key="0">汽油</Option>
                      <Option key="1">柴油</Option>
                      <Option key="2">新能源</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="初登日期" {...formItem8_15}>
                  <div>
                    {getFieldDecorator('register_date', {
                      initialValue: auto.register_date
                        ? formatter.getMomentDate(auto.register_date)
                        : formatter.getMomentDate(),
                    })(
                      <DatePicker size="large" placeholder="请选择初登日期" allowClear={false} />,
                    )}

                    <Tooltip title="初登日期指交管所车辆的登记日期，亦即年检日期" arrowPointAtCenter>
                      <Icon type="question-circle-o" className="help-icon-font" />
                    </Tooltip>
                  </div>
                </FormItem>
              </Col>
            </Row>
          </Panel>

          <Panel header="保险信息" key="2">
            <Row>
              <Col span={12}>
                <FormItem label="交强险承保公司" {...formItem8_15}>
                  {getFieldDecorator('force_company', { initialValue: auto.force_company })(
                    <Input placeholder="交强险承保公司" />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="交强险到期日期" {...formItem8_15}>
                  {getFieldDecorator('force_expire_date', {
                    initialValue: auto.force_expire_date
                      ? formatter.getMomentDate(auto.force_expire_date)
                      : formatter.getMomentDate(),
                  })(
                    <DatePicker placeholder="交强险到期日" />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="商业险承保公司" {...formItem8_15}>
                  {getFieldDecorator('business_company', { initialValue: auto.business_company })(
                    <Input placeholder="请输入商业险承保公司" />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="商业险到期日期" {...formItem8_15}>
                  {getFieldDecorator('business_expire_date', {
                    initialValue: auto.business_expire_date
                      ? formatter.getMomentDate(auto.business_expire_date)
                      : formatter.getMomentDate(),
                  })(
                    <DatePicker placeholder="商业险到期日" />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="商业险总额" {...formItem8_15}>
                  {getFieldDecorator('business_amount', { initialValue: auto.business_amount })(
                    <Input placeholder="请输入商业险总额" />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Panel>

          <Panel header="其它信息" key="3">
            <Row>
              <Col span={12}>
                <FormItem label="车辆型号" {...formItem8_15}>
                  {getFieldDecorator('auto_type_num', { initialValue: auto.auto_type_num })(
                    <Input placeholder="如:SVW71617BM" />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="内饰" {...formItem8_15}>
                  {getFieldDecorator('in_color', { initialValue: auto.in_color })(
                    <Select {...selectStyle}>
                      <Option key="-1">不限</Option>
                      <Option key="0">米</Option>
                      <Option key="1">棕</Option>
                      <Option key="2">黑</Option>
                      <Option key="3">灰</Option>
                      <Option key="4">红</Option>
                      <Option key="5">蓝</Option>
                      <Option key="6">白</Option>
                    </Select>,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="销售地" {...formItem8_15}>
                  {getFieldDecorator('source', {
                    initialValue: String(auto.source) === '0'
                      ? ''
                      : auto.source,
                  })(
                    <Input placeholder="请输入销售地" />,
                  )}
                </FormItem>
              </Col>
              <Col span={12}>
                <FormItem label="来源4S" {...formItem8_15}>
                  {getFieldDecorator('source_4s', { initialValue: auto.source_4s })(
                    <Input />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={12}>
                <FormItem label="行驶证照片" {...formItem8_15}>
                  <span className="mr10">
                    {getFieldDecorator('vehicle_license_pic_front')(
                      <Input type="hidden" />,
                    )}
                    <Qiniu
                      prefix="vehicle_license_pic_front"
                      saveKey={this.handleKey.bind(this)}
                      source={api.system.getPrivatePicUploadToken('vehicle_license_pic_front')}
                      onDrop={this.onDrop.bind(this, 'vehicle_license_pic_front')}
                      onUpload={this.onUpload.bind(this, 'vehicle_license_pic_front')}>
                      {this.renderImage('vehicle_license_pic_front')}
                    </Qiniu>
                  </span>
                  <span>
                    {getFieldDecorator('vehicle_license_pic_back')(
                      <Input type="hidden" />,
                    )}
                    <Qiniu
                      prefix="vehicle_license_pic_back"
                      saveKey={this.handleKey.bind(this)}
                      source={api.system.getPrivatePicUploadToken('vehicle_license_pic_back')}
                      onDrop={this.onDrop.bind(this, 'vehicle_license_pic_back')}
                      onUpload={this.onUpload.bind(this, 'vehicle_license_pic_back')}>
                      {this.renderImage('vehicle_license_pic_back')}
                    </Qiniu>
                  </span>
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={24}>
                <FormItem label="备注" {...formItem4_19}>
                  {getFieldDecorator('remark', { initialValue: auto.remark })(
                    <TextArea />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <div className="form-action-container">
          <Button size="large" onClick={this.props.cancelModal} className="mr10">取消</Button>
          <Button size="large" type="primary" onClick={this.handleSubmit}>保存</Button>
        </div>
      </Form>
    );
  }
}

NewAutoForm = Form.create()(NewAutoForm);
export default NewAutoForm;
