import React from 'react';
import { Button, Col, Form, Input, message, Modal, Row, Select } from 'antd';
import { Link } from 'react-router-dom';

import Layout from '../../../utils/FormLayout';
import styles from './style';

const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;

require('./index.less');

class EditFinPlanChildren extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isBrandTrue: true,
      disabledModels: false,
      disabledCustom: true,
      product_id: '',
      auto_brand_id: '',
      auto_series_id: '',
      auto_type_id: '',
      guide_price: '',
      pickupModuleVisible: false,
      auto_type_version: '',
      auto_type_year: '',
      displacement: '',
      resource_id: '',
      type: '1',
      guidePriceModule: '',
      displacementModule: '',
    };
    [

      'getPriceAndDisplacement',
      'changeGuidePrice',
      'changeDisplacement',
      'changeCustom',
      'changeAutoTypeVersion',
      'changeAutoTypeYear',
      'handleAutoTypeChange',
      'handleRefresh',
      'handleChangeMakeModule',
      'handleBrand',
      'handleSeries',
      'handleSeriesType',
      'handleSubmit',
      'handlePickupModuleCancel',
      'handleOffOrOnLine',
      'handlePriceModuleChange',
      'handleDisplacementModuleChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    setTimeout(() => {
      this.getPriceAndDisplacement(this.props.planDetailData.auto_type_id);
    }, 1000);
  }

  componentWillMount() {
    const data = {
      skip: 0,
      limit: '',
      resource_id: 2,
    };
    this.props.getMaterialList(data.skip, data.limit, data.resource_id);
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.planDetailData !== nextProps.planDetailData) &&
      (this.props.planDetailData !== '' || [])) {
      this.setState({
        guide_price: this.props.planDetailData.guide_price,
        product_id: this.props.planDetailData.product_id,
        auto_brand_id: this.props.planDetailData.auto_brand_id,
        auto_series_id: this.props.planDetailData.auto_series_id,
        auto_type_id: this.props.planDetailData.auto_type_id,
      });
    }
    if (!this.regReport) return;
    this.regReport = false;
    if (nextProps.createAutoTypeResponse !== '' || null || undefined &&
      this.props.createAutoTypeResponse.auto_type_id !==
      nextProps.createAutoTypeResponse.auto_type_id) {
      this.setState({
        auto_type_id: nextProps.createAutoTypeResponse.auto_type_id,
      });
      this.props.getTypesBySeries(this.state.auto_series_id);
    }
  }

  handleChangeMakeModule(e) {
    const is_have_serise = this.props.form.getFieldValue('auto_series_id');
    if (is_have_serise) {
      this.setState({
        disabledModels: true,
        pickupModuleVisible: true,
      });
    } else {
      alert('请选择车辆品牌和车系');
    }
  }

  handleBrand(value) {
    const autoBrandId = value.split('-')[0];

    this.setState({
      auto_brand_id: autoBrandId,
    });
    this.props.form.setFieldsValue({
      auto_series_id: '',
      auto_type_id: '',
      module_auto_brand_id: '',
    });
    this.props.getSeriesByBrand(value);
  }

  handleSeries(value) {
    const toArry = value.split('/');
    const toStringAuto_series_id = toArry[0];
    this.setState({
      auto_series_id: toStringAuto_series_id,
    });
    this.props.form.setFieldsValue({ module_auto_type_id: '' });
    this.props.getTypesBySeries(value.split('/')[0]);
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
    this.setState({
      guide_price: chooseCarType.guide_price,
      displacement: chooseCarType.displacement,
    });
  }

  changeGuidePrice(e) {
    const { value } = e.target;
    this.setState({ guide_price: value });
    this.props.form.setFieldsValue({ guide_price: value });
  };

  changeDisplacement(e) {
    const { value } = e.target;
    this.setState({
      displacement: value,
    });
    this.props.form.setFieldsValue({ displacement: value });
  };

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

  changeCustom(e) {
    this.setState({
      guide_price: e.target.value,
    });
  };

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          plan_id: this.props.plan_id,
          auto_brand_id: values.auto_brand_id,
          auto_series_id: values.auto_series_id,
          auto_type_id: values.auto_type_id,
          product_id: values.product_id,
          guide_price: values.guide_price,
          out_in_colors: values.out_in_colors,
        };
        this.props.handleEditLoanPlan(data);
      }
    });
  };

  handlePickupModuleCancel() {
    this.setState({ pickupModuleVisible: false });
  };

  changeAutoTypeVersion(e) {
    this.setState({
      auto_type_version: e.target.value,
    });
  };

  changeAutoTypeYear(e) {
    this.setState({
      auto_type_year: e.target.value,
    });
  };

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
      const data = {
        auto_brand_id: values.auto_brand_id,
        auto_series_id: values.auto_series_id,
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
      this.props.createAutoType(data, autoTypeId => this.handleRefresh(auto_series_id, autoTypeId));
    });
  };

  handleOffOrOnLine() {
    const { planDetailData } = this.props;
    if (String(planDetailData.status) === '0') {
      this.props.planOffline({ plan_id: planDetailData._id });
    } else if (String(planDetailData.status) === '-1') {
      this.props.planOnline({ plan_id: planDetailData._id });
    }
  }

  handleRefresh(auto_series_id, autoTypeId) {
    const { guidePriceModule, displacementModule } = this.state;
    this.props.getTypesBySeries(auto_series_id);
    this.props.form.setFieldsValue({
      auto_type_id: String(autoTypeId),
      guide_price: guidePriceModule,
      displacement: displacementModule,
    });
  };

  render() {
    const { guide_price, displacement } = this.state;
    const { productListData, brandsData, seriesByBrandData, typesBySeriesData } = this.props;
    const productAllDataList = productListData.list;
    const brandsDataList = brandsData.auto_brand_list;
    const seriesByBrandDataList = seriesByBrandData.series;
    const seriesDataType = typesBySeriesData.type;
    const planDetailData = this.props.planDetailData;

    const propductList = [];
    if (productAllDataList) {
      for (let i = 0; i < productAllDataList.length; i++) {
        propductList.push(
          <Option
            key={productAllDataList[i]._id}
            value={productAllDataList[i]._id}
            title={productAllDataList[i].name}>
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
          <Option key={seriesByBrandDataList[i]._id} value={seriesByBrandDataList[i]._id}>
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
              {`${seriesDataType[i].version  },${  seriesDataType[i].year}`}
            </span>
          </Option>);
      }
    }

    const { formItemLayout, formItemLayoutHalf, formItem_814Half } = Layout;
    const { getFieldDecorator } = this.props.form;
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
                保存
              </Button>
            </div>

            <div className="pull-right mr20">
              <Button type="primary" onClick={this.handleOffOrOnLine}>
                {String(planDetailData.status) === '0' ? '下架' : ' '}
                {String(planDetailData.status) === '-1' ? '上架' : ' '}
              </Button>
            </div>

            <div className="pull-right mr20">
              <Link to={{ pathname: '/new-car/programme-car/new/addFinancial' }}>
                <Button>
                  继续创建
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <Form>
          <FormItem label="产品名称" {...formItemLayoutHalf} >
            {getFieldDecorator('product_name', {
              rules: [{ required: true, message: '产品名称', whitespace: false }],
              initialValue: planDetailData.product_name,
            })(
              <Input disabled style={styles.width360} />,
            )}
          </FormItem>
          <FormItem label="车辆品牌" {...formItemLayoutHalf} >
            {getFieldDecorator('auto_brand_id', {
              rules: [{ required: true, message: '品牌', whitespace: false }],
              initialValue: planDetailData.auto_brand_id &&
              `${planDetailData.auto_brand_id}-${planDetailData.auto_brand_name}`,
            })(
              <Select
                showSearch
                placeholder="品牌"
                onChange={this.handleBrand}
                style={styles.width360}
              >
                {brandsList}
              </Select>,
            )}
          </FormItem>

          <FormItem label="车系" {...formItemLayoutHalf} >
            {getFieldDecorator('auto_series_id', {
              rules: [{ required: true, message: '车系', whitespace: false }],
              initialValue: planDetailData.auto_series_id,
            })(
              <Select placeholder="车系" onChange={this.handleSeries} style={{ width: 360 }}>
                {brandsListChildren}
              </Select>,
            )}
          </FormItem>

          <Row>
            <Col span={12} className='mb10'>
              <FormItem label="车型" {...formItemLayout} >
                {getFieldDecorator('auto_type_id', {
                  initialValue: planDetailData.auto_type_id,
                  rules: [{ required: true, message: '车型', whitespace: false }],
                })(
                  <Select
                    size="large"
                    placeholder="车型"
                    onChange={this.handleSeriesType}
                    style={styles.width360}
                    dropdownMatchSelectWidth={false}
                  >
                    {getSeriesByBrandDataTypeList}
                  </Select>,
                )}
                <span style={styles.marginLeft}>
                  {getFieldDecorator('auto_type_version')(
                    <span onClick={this.handleChangeMakeModule}><a>自定义车型</a></span>,
                  )}
                </span>
              </FormItem>

            </Col>
          </Row>

          <FormItem label="外观／内饰" {...formItemLayoutHalf} >
            {getFieldDecorator('out_in_colors', {
              rules: [{ required: false, message: '外观／内饰', whitespace: false }],
              initialValue: planDetailData.out_in_colors,
            })(
              <Input
                placeholder="请输入外观／内饰颜色。示例：外白内黑；外黑内白"
                style={styles.width360}
              />,
            )}
          </FormItem>

          <FormItem label="厂商指导价" {...formItemLayoutHalf} >
            {getFieldDecorator('guide_price', {
              initialValue: Number(planDetailData.guide_price).toFixed(0),
            })(
              <Input
                placeholder="厂商指导价"
                addonAfter={'元'}
                type="number"
                disabled={true}
                style={styles.width360}
              />,
            )}
          </FormItem>

          <FormItem label="排量" {...formItemLayoutHalf}>
            {getFieldDecorator('displacement', {
              initialValue: planDetailData.displacement,
            })(
              <Input
                placeholder="排量"
                type="number"
                addonAfter={<span style={styles.styleL}>L</span>}
                onBlur={this.changeDisplacement}
                disabled={true}
                style={styles.width360}
              />,
            )}
          </FormItem>
        </Form>

        <Modal
          visible={this.state.pickupModuleVisible}
          onCancel={this.handlePickupModuleCancel}
          maskClosable={true}
          width={600}
          footer={[
            <Button key="1" onClick={this.handlePickupModuleCancel}>
              取消
            </Button>,
            <Button key="2" type="primary" onClick={this.handleAutoTypeChange}>
              确定
            </Button>,
          ]}
          title="自定义车型"
        >
          <Form>
            <FormItem label="车辆品牌" {...formItem_814Half} >
              {getFieldDecorator('module_auto_brand_id', {
                initialValue: planDetailData.auto_brand_id &&
                `${planDetailData.auto_brand_id}-${planDetailData.auto_brand_name}`,
              })(
                <Select
                  style={styles.width218}
                  placeholder="品牌"
                  onChange={this.handleBrand}
                  disabled={this.state.disabledModels}
                >
                  {brandsList}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车系" {...formItem_814Half} >
              {getFieldDecorator('module_auto_series_id', {
                initialValue: planDetailData.auto_series_id,
              })(
                <Select
                  style={styles.width218}
                  placeholder="车系"
                  onChange={this.handleSeries}
                  disabled={true}
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
                      onBlur={this.changeAutoTypeVersion}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      style={styles.width218}
                      placeholder="车型名称：例如2.1T尊旅 中轴版"
                      onBlur={this.changeAutoTypeYear}
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
                  onChange={this.handlePriceModuleChange}
                />,
              )}
            </FormItem>

            <FormItem label="排量" {...formItem_814Half} required>
              {getFieldDecorator('displacementModule')(
                <Input
                  style={styles.width218}
                  placeholder="排量"
                  type="number"
                  addonAfter={<span style={styles.styleL}>L</span>}
                  onChange={this.handleDisplacementModuleChange}
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

EditFinPlanChildren = Form.create()(EditFinPlanChildren);
export default EditFinPlanChildren;
