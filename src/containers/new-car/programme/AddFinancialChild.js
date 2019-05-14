import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';

import Layout from '../../../utils/FormLayout';
import api from '../../../middleware/api';

import SearchProductDrop from './SearchProductDrop';
import styles from './style';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

require('./index.less');

class AddFinPlanChildren extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabledModels: false,
      disabledCustom: true,
      product_id: '',
      auto_brand_id: '',
      auto_series_id: '',
      auto_type_id: '',
      guide_price: '',
      pickupModuleVisible: false,
      auto_factory_id: '',
      auto_type_version: '',
      auto_type_year: '',
      displacement: '',
      auto_series_factory_id: '',
      auto_brand_name: '',
      productListData: {},
      productListChoose: {},
      guidePriceModule: '',
      displacementModule: '',
    };
    [
      'handleMakeCarModule',
      'handleBrand',
      'handleSeries',
      'handleSeriesType',
      'handleSubmit',
      'handleProductChange',
      'handlePickupModuleCancel',
      'handleAutoTypeVersion',
      'handleAutoTypeYear',
      'handleGuidePrice',
      'handleDisplacement',
      'handleAutoTypeChange',
      'handleRefresh',
      'handleInputFocus',
      'handTableRowClick',
      'handlePriceModuleChange',
      'handleDisplacementModuleChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleProductChange(e) {
    this.setState({
      product_id: e,
    });
  }

  handleMakeCarModule(e) {
    const isHaveSerise = this.props.form.getFieldValue('auto_series_id');
    this.props.getSeriesByBrand(this.state.auto_brand_id);
    if (isHaveSerise) {
      this.setState({
        disabledModels: true,
        pickupModuleVisible: true,
      });
    } else {
      message.error('请选择车辆品牌和车系');
    }
  }

  handleBrand(value) {
    const autoBrandId = value.split('-')[0];
    const auto_brand_name = value.split('-')[1];

    this.setState({
      auto_brand_id: autoBrandId,
      auto_brand_name,
    });

    this.props.getSeriesByBrand(value);
    this.props.form.setFieldsValue({ auto_series_id: '', auto_type_id: '' });
  }

  handleSeries(value) {
    const toArry = value.split('/');
    const toStringAuto_series_id = toArry[0];
    const toStringAuto_factory_id = toArry[1];
    this.setState({
      auto_series_factory_id: value,
      auto_series_id: toStringAuto_series_id,
      auto_factory_id: toStringAuto_factory_id,
    });
    this.props.getTypesBySeries(value.split('/')[0]);

    this.props.form.setFieldsValue({ auto_type_id: '' });
  }

  handleSeriesType(value) {
    this.setState({
      auto_type_id: value,
    });

    this.getPriceAndDisplacement(value);
  }

  getPriceAndDisplacement(id) {
    const typesBySeriesData = this.props.typesBySeriesData.type;
    let chooseCarType = {};
    typesBySeriesData.forEach(item => {
      if (String(item._id) === String(id)) {
        chooseCarType = item;
      }
    });
    this.props.form.setFieldsValue({
      guide_price: chooseCarType.guide_price,
      displacement: chooseCarType.displacement,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const { productListChoose } = this.state;
      let handleProductId;
      if (this.props.product_id == '' || null || undefined) {
        handleProductId = this.state.productListChoose._id;

        if (!this.state.productListChoose._id) {
          message.error('请选择产品名称');
          return;
        }
        if (!values.auto_type_id) {
          message.error('请选择车辆品牌和车型');
          return;
        }
      }
      if (this.props.product_id) {
        handleProductId = this.props.product_id;
      }
      if (!err) {
        const data = {
          auto_brand_id: values.auto_brand_id,
          auto_series_id: values.auto_series_id,
          auto_type_id: values.auto_type_id,
          product_id: handleProductId,
          out_in_colors: values.out_in_colors,
          guide_price: values.guide_price,
          displacement: values.displacement,
        };
        this.props.createLoanPlan(data, detail => {
          window.location.href = `/new-car/programme-car/new/editFinancial/${detail._id}`;
        });
      }
    });
  }

  handlePickupModuleCancel() {
    this.setState({ pickupModuleVisible: false });
  }

  handleAutoTypeVersion(e) {
    this.setState({
      auto_type_version: e.target.value,
    });
  }

  handleAutoTypeYear(e) {
    this.setState({
      auto_type_year: e.target.value,
    });
  }

  handleGuidePrice(e) {
    const { value } = e.target;
    this.setState({ guide_price: value });
    this.props.form.setFieldsValue({ guide_price: value });
  }

  handleDisplacement(e) {
    const { value } = e.target;
    this.setState({
      displacement: value,
    });
    this.props.form.setFieldsValue({ displacement: value });
  }

  handlePriceModuleChange(e) {
    this.setState({
      guidePriceModule: e.target.value,
    });
  }

  handleDisplacementModuleChange(e) {
    this.setState({
      displacementModule: e.target.value,
    });
  }

  handleAutoTypeChange() {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!values.guidePriceModule) {
        message.error('厂商指导价不可为空');
        return;
      }
      if (!values.displacementModule) {
        message.error('排量不可为空');
        return;
      }
      console.log(values);
      const data = {
        auto_brand_id: this.state.auto_brand_id,
        auto_series_id: this.state.auto_series_id,
        auto_type_year: this.state.auto_type_year,
        auto_type_version: this.state.auto_type_version,
        guide_price: values.guidePriceModule,
        displacement: values.displacementModule,
      };
      this.setState({
        auto_series_id: values.auto_series_id,
        pickupModuleVisible: false,
      });
      const auto_series_id = values.auto_series_id;
      this.props.handleAutoTypeChange(data, autoTypeId => this.handleRefresh(auto_series_id, autoTypeId));
    });
  }

  handleRefresh(auto_series_id, autoTypeId) {
    const { guidePriceModule, displacementModule } = this.state;
    this.props.getTypesBySeries(auto_series_id);
    this.props.form.setFieldsValue({
      auto_type_id: String(autoTypeId),
      guide_price: guidePriceModule,
      displacement: displacementModule,
    });
  }

  handleInputFocus(e) {
    const { productListData } = this.props;
    const list = productListData.list;

    const newList = [];
    for (let i = 0, len = list.length; i < len; i++) {
      if (String(list[i].is_specific_auto_type) === '1') {
        newList.push(list[i]);
      }
    }
    const coordinate = api.getPosition(e);

    const info = {};
    info.info = newList;
    info.coordinate = coordinate;
    info.visible = true;
    this.setState({ productListData: info });
  }

  handTableRowClick(value) {
    this.setState({ productListChoose: value });
  }

  render() {
    const {
      productListData,
      brandsData,
      seriesByBrandData,
      typesBySeriesData,
      product_id,
      productDetail,
    } = this.props;
    const {
      guide_price,
      displacement,
      auto_brand_id,
      auto_brand_name,
      disabledModels,
      auto_series_factory_id,
      pickupModuleVisible,
      productListChoose,
    } = this.state;
    const productAllDataList = productListData.list;
    const brandsDataList = brandsData.auto_brand_list;
    const seriesByBrandDataList = seriesByBrandData.series;
    const seriesDataType = typesBySeriesData.type;
    const { formItemLayout, formItemLayoutHalf, formItem_814Half } = Layout;
    const { getFieldDecorator } = this.props.form;

    const productList = [];
    if (productAllDataList) {
      for (let i = 0; i < productAllDataList.length; i++) {
        productList.push(
          <Option
            title={productAllDataList[i].name}
            key={productAllDataList[i]._id}
            value={productAllDataList[i]._id}
          >
            {productAllDataList[i].name}
          </Option>);
      }
    }

    const brandsList = [];
    if (brandsDataList) {
      for (let i = 0; i < brandsDataList.length; i++) {
        brandsList.push(
          <Option
            title={brandsDataList[i].name}
            key={`${brandsDataList[i]._id}-${brandsDataList[i].name}`}
            value={`${brandsDataList[i]._id}-${brandsDataList[i].name}`}
          >
            {brandsDataList[i].name}
          </Option>);
      }
    }
    const brandsListChildren = [];
    if (seriesByBrandDataList) {
      for (let i = 0; i < seriesByBrandDataList.length; i++) {
        brandsListChildren.push(
          <Option
            key={`${seriesByBrandDataList[i]._id  }/${  seriesByBrandDataList[i].auto_factory_id}`}
            value={`${seriesByBrandDataList[i]._id  }/${
              seriesByBrandDataList[i].auto_factory_id}`}
          >
            {seriesByBrandDataList[i].name}
          </Option>);
      }
    }
    const getSeriesByBrandDataTypeList = [];
    if (seriesDataType) {
      for (let i = 0; i < seriesDataType.length; i++) {
        getSeriesByBrandDataTypeList.push(
          <Option key={seriesDataType[i]._id} value={seriesDataType[i]._id}>
            <span className="new-car-product-select">
              {`${seriesDataType[i].guide_price}元`}
            </span>

            <span>
              {`${seriesDataType[i].version},${seriesDataType[i].year}`}
            </span>
          </Option>);
      }
    }

    return (
      <div>
        <Row className="head-action-bar-line mb20">
          <Col span={8}>金融方案基本信息</Col>
          <Col span={16}>
            <div className="pull-right">
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                确认创建
              </Button>
            </div>
          </Col>
        </Row>

        <Form>
          <SearchProductDrop
            partsInfo={this.state.productListData}
            onTableRowClick={this.handTableRowClick}
          />
          {
            !product_id ? <FormItem label="产品名称"{...formItemLayoutHalf} required>
                <Input
                  onFocus={this.handleInputFocus}
                  value={productListChoose.name}
                  style={styles.width360}
                  placeholder="请点击下拉框选择产品"
                  size="large"
                />
              </FormItem>
              : <FormItem label="产品名称"{...formItemLayoutHalf} required>
                <Input
                  style={styles.width360}
                  value={productDetail.name}
                  disabled
                />
              </FormItem>
          }
          <FormItem label="车辆品牌" {...formItemLayoutHalf} >
            {getFieldDecorator('auto_brand_id', {
              rules: [{ required: true, message: '品牌', whitespace: true }],
            })(
              <Select
                showSearch
                style={styles.width360}
                placeholder="品牌"
                onChange={this.handleBrand}
                size="large"
              >
                {brandsList}
              </Select>,
            )}
          </FormItem>

          <FormItem label="车系" {...formItemLayoutHalf}>
            {getFieldDecorator('auto_series_id', {
              rules: [{ required: true, message: '车系', whitespace: true }],
            })(
              <Select
                style={styles.width360}
                placeholder="车系"
                onChange={this.handleSeries}
                size="large"
              >
                {brandsListChildren}
              </Select>,
            )}
          </FormItem>

          <Row>
            <Col span={12} className='mb10'>
              <FormItem label="车型" {...formItemLayout} required>
                {getFieldDecorator('auto_type_id')(
                  <Select
                    style={styles.width360}
                    placeholder="车型"
                    onChange={this.handleSeriesType}
                    size="large"
                    dropdownMatchSelectWidth={false}
                  >
                    {getSeriesByBrandDataTypeList}
                  </Select>,
                )}

                <span style={styles.marginLeft}>
                  {getFieldDecorator('auto_type_version')(
                    <span onClick={this.handleMakeCarModule}><a>自定义车型</a></span>,
                  )}
                </span>
              </FormItem>

            </Col>
          </Row>

          <FormItem label="外观／内饰" {...formItemLayoutHalf} >
            {getFieldDecorator('out_in_colors')(
              <Input
                style={styles.width360}
                placeholder="请输入外观／内饰颜色。示例：外白内黑；外黑内白"
              />,
            )}
          </FormItem>

          <FormItem label="厂商指导价" {...formItemLayoutHalf} >
            {getFieldDecorator('guide_price', {
              initialValue: guide_price,
            })(
              <Input
                style={styles.width360}
                placeholder="厂商指导价"
                addonAfter={'元'}
                type="number"
                size="large"
                disabled
              />,
            )}
          </FormItem>

          <FormItem label="排量" {...formItemLayoutHalf}>
            {getFieldDecorator('displacement', {
              initialValue: displacement,
            })(
              <Input
                style={styles.width360}
                placeholder="排量"
                type="number"
                size="large"
                addonAfter={<span style={styles.styleL}>L</span>}
                disabled
              />,
            )}
          </FormItem>

        </Form>

        <Modal
          visible={pickupModuleVisible}
          onCancel={this.handlePickupModuleCancel}
          maskClosable={true}
          width={600}
          footer={[
            <Button key="1" onClick={this.handlePickupModuleCancel}>取消</Button>,
            <Button key="2" type="primary" onClick={this.handleAutoTypeChange}> 确定</Button>,
          ]}
          title="自定义车型"
        >

          <Form>
            <FormItem label="车辆品牌" {...formItem_814Half}>
              {getFieldDecorator('module_auto_brand_id', {
                initialValue: auto_brand_id &&
                `${auto_brand_id}-${auto_brand_name}`,
              })(
                <Select
                  style={styles.width218}
                  placeholder="品牌"
                  disabled={disabledModels}
                  onChange={this.handleBrand}
                >
                  {brandsList}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车系" {...formItem_814Half}>
              {getFieldDecorator('module_auto_type_id', {
                initialValue: auto_series_factory_id,
              })(
                <Select
                  style={styles.width218}
                  placeholder="车系"
                  disabled={disabledModels}
                  onChange={this.handleSeries}
                >
                  {brandsListChildren}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车型" {...formItem_814Half} >
              {getFieldDecorator('module_auto_type_id', {
                rules: [{ required: false, message: '车型', whitespace: true }],
              })(
                <InputGroup size="large">
                  <Col span={12}>
                    <Input
                      style={styles.width218}
                      placeholder="年款：例如2017款"
                      onBlur={this.handleAutoTypeVersion}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      style={styles.width218}
                      placeholder="车型名称：例如2.1T尊旅 中轴版"
                      onBlur={this.handleAutoTypeYear}
                    />
                  </Col>
                </InputGroup>,
              )}
            </FormItem>

            <FormItem label="厂商指导价" {...formItem_814Half} required>
              {getFieldDecorator('guidePriceModule')(
                <Input
                  style={styles.width218}
                  placeholder="厂商指导价"
                  addonAfter={'元'}
                  type="number"
                  min={0}
                  onChange={this.handlePriceModuleChange.bind(this)}
                />,
              )}
            </FormItem>

            <FormItem label="排量" {...formItem_814Half} required>
              {getFieldDecorator('displacementModule')(
                <Input
                  style={styles.width218}
                  placeholder="排量"
                  type="number"
                  min={0}
                  addonAfter={<span style={styles.styleL}>L</span>}
                  onChange={this.handleDisplacementModuleChange.bind(this)}
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    )
      ;
  }
}

AddFinPlanChildren = Form.create()(AddFinPlanChildren);
export default AddFinPlanChildren;
