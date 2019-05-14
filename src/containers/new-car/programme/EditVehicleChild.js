import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from 'antd';
import { Link } from 'react-router-dom';

import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';

import { getMaterialList } from '../../../reducers/new-car/product/productActions';
import {
  createAmountFixPlan,
  createAutoType,
  createLoanPlan,
  getBrands,
  getPlanDetail,
  getTypesBySeries,
  planOffline,
  planOnline,
} from '../../../reducers/new-car/programe/programeActions';
import styles from './style';

const InputGroup = Input.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
require('./index.less');

class EditVehiPlayChildren extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationVisible: false,
      deliveryData: [],
      applicationData: [],
      financeConfig: [],
      materialData: [],
      moneyState: '1',
      product_id: '',
      auto_brand_id: '',
      auto_series_id: '',
      auto_type_id: '',
      guide_price: '',
      pickupModuleVisible: false,
      makeModuleCar: false,
      auto_factory_id: '',
      auto_type_version: '',
      auto_type_year: '',
      displacement: '',
      out_in_colors: '',
      remark: '',
      finance_length_type12: '',
      finance_length_type36: '',
      finance_length_type48: '',
      finance_length_type24: '',
      monthly_rent: '',
      cash_deposit: '',
      rent_down_payment: '',
      salvage_value: '',
      service_fee: '',
      pay_service_fee_in_down_payment: '0',
      finance_config: '',
      guidePriceModule: '',
      displacementModule: '',
    };

    [
      'showApplicationModule',
      'showPickupModule',
      'handlePickupModuleCancel',
      'handleApplicationModuleCancel',
      'getMaterialAndMonthPayment',
      'createProduct',
      'handleCarModule',
      'handleBrand',
      'handleSeries',
      'handleSeriesType',
      'getPriceAndDisplacement',
      'cancelCarModule',
      'change_auto_type_version',
      'change_auto_type_year',
      'change_out_in_colors',
      'change_guide_price',
      'change_displacement',
      'change_rent_down_payment',
      'change_monthly_rent',
      'change_salvage_value',
      'change_cash_deposit',
      'change_service_fee',
      'change_service_remark',
      'change_finance_config',
      'handlePay',
      'handleAutoTypeChange',
      'deleteApplicationData',
      'handleSureCreateCarPlay',
      'onApplicationRowChange',
      'onPickupRowChange',
      'deleteDeliveryData',
      'handleOffOrOnLine',
      'handlePriceModuleChange',
      'handleDisplacementModuleChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    this.props.actions.getPlanDetail(this.props.planId, this.getMaterialAndMonthPayment.bind(this));
  }

  componentWillReceiveProps(nextProps) {

    const { planDetailData } = this.props;

    if (nextProps.materialData !== this.props.materialData) {
      let materialListData2 = nextProps.materialData.list;
      for (let i = 0; i < materialListData2.length; i++) {
        materialListData2[i].isCheck = false;
      }
      this.setState({ materialData: materialListData2 });
    }

    if ((planDetailData !== nextProps.planDetailData) &&
      (planDetailData !== '' || [])) {
      const planDetailData = nextProps.planDetailData;
      this.setState({
        product_id: planDetailData.product_id,
        auto_brand_id: planDetailData.auto_brand_id,
        auto_series_id: planDetailData.auto_series_id,
        auto_type_id: planDetailData.auto_type_id,
        out_in_colors: planDetailData.out_in_colors,
        guide_price: planDetailData.guide_price,
        displacement: planDetailData.displacement,
        rent_down_payment: planDetailData.rent_down_payment,
        monthly_rent: planDetailData.monthly_rent,
        salvage_value: planDetailData.salvage_value,
        cash_deposit: planDetailData.cash_deposit,
        service_fee: planDetailData.service_fee,
        finance_config: planDetailData.finance_config,
        remark: planDetailData.remark,
        pickup_material_ids: planDetailData.pickup_material_ids,
        application_material_ids: planDetailData.application_material_ids,
        pay_service_fee_in_down_payment: planDetailData.pay_service_fee_in_down_payment,
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
    }
  }

  getMaterialAndMonthPayment(data) {
    this.setState({
      applicationData: data.application_material_list,
      deliveryData: data.pickup_material_list,
      financeConfig: data.detail.finance_config
        ? JSON.parse(data.detail.finance_config)
        : [],
    });
    // let condition={
    //   skit:'0'
    // }
    this.props.getMaterialList(data.skip, data.limit, data.detail.resource_id);
  }

  createProduct(e) {
    this.setState({
      product_id: e,
    });
  }

  handleCarModule(e) {
    const is_have_serise = this.state.auto_series_id;
    if (is_have_serise) {
      this.setState({
        makeModuleCar: true,
      });
    } else {
      message.error('请选择车辆品牌和车系！');
    }
  }

  handleBrand(value) {
    const autoBrandId = value.split('-')[0];

    this.setState({
      auto_brand_id: autoBrandId,
    });

    this.props.form.setFieldsValue({ auto_series_id: '', auto_type_id: '' });
    this.props.getSeriesByBrand(value);
  }

  handleSeries(value) {
    const toArray = value.split('/');
    const toStringAuto_series_id = toArray[0];
    this.setState({
      auto_series_id: toStringAuto_series_id,
      auto_factory_id: '',
    });
    this.props.form.setFieldsValue({ auto_type_id: '' });
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

  cancelCarModule() {
    this.setState({ makeModuleCar: false });
  }

  change_auto_type_version(e) {
    this.setState({
      auto_type_version: e.target.value,
    });
  }

  change_auto_type_year(e) {
    this.setState({
      auto_type_year: e.target.value,
    });
  }

  change_out_in_colors(e) {
    this.setState({
      out_in_colors: e.target.value,
    });
  }

  change_guide_price(e) {
    this.setState({
      guide_price: e.target.value,
    });
  }

  change_displacement(e) {
    this.setState({
      displacement: e.target.value,
    });
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

  change_rent_down_payment(e) {
    this.setState({
      rent_down_payment: e.target.value,
    });
  }

  change_monthly_rent(e) {
    this.setState({
      monthly_rent: e.target.value,
    });
  }

  change_salvage_value(e) {
    this.setState({
      salvage_value: e.target.value,
    });
  }

  change_cash_deposit(e) {
    this.setState({
      cash_deposit: e.target.value,
    });
  }

  change_service_fee(e) {
    this.setState({
      service_fee: e.target.value,
    });
  }

  change_service_remark(e) {
    this.setState({
      remark: e.target.value,
    });
  }

  change_finance_config(record, e) {
    const value = e.target.value;
    const { financeConfig } = this.state;

    const financeConfigChange = financeConfig.map(item => {
      if (String(item.finance_length_type) === String(record.finance_length_type)) {
        item.monthly_payment = value;
      }
      return item;
    });

    this.setState({ financeConfig: financeConfigChange });
  }

  handlePay(e) {
    if (e.target.checked) {
      this.setState({
        pay_service_fee_in_down_payment: 1,
      });
    }
    if (e.target.checked == false) {
      this.setState({
        pay_service_fee_in_down_payment: 0,
      });
    }
  }

  handleAutoTypeChange() {
    const data = {
      auto_brand_id: this.state.auto_brand_id,
      auto_series_id: this.state.auto_series_id,
      auto_type_year: this.state.auto_type_year,
      auto_type_version: this.state.auto_type_version,
      guide_price: this.state.guidePriceModule,
      displacement: this.state.displacementModule,
    };
    this.setState({
      makeModuleCar: false,
    });
    const auto_series_id = this.state.auto_series_id;
    this.props.handleAutoTypeChange(data, autoTypeId => this.handleRefresh(auto_series_id, autoTypeId));
  }

  handleRefresh(auto_series_id, autoTypeId) {
    const { guidePriceModule, displacementModule } = this.state;
    this.props.getTypesBySeries(auto_series_id);
    this.setState({
      auto_type_id: autoTypeId,
    });
    this.props.form.setFieldsValue({
      auto_type_id: String(autoTypeId),
      guide_price: guidePriceModule,
      displacement: displacementModule,
    });
  }

  showApplicationModule() {

    let applicationData = this.state.applicationData;
    let handleMaterialData = this.state.materialData;

    for (let i = 0; i < applicationData.length; i++) {
      for (let j = 0; j < handleMaterialData.length; j++) {
        if (Number(applicationData[i]._id) === Number(handleMaterialData[j]._id)) {
          handleMaterialData[j].isCheck = true;
        }
      }
    }
    this.setState({
      applicationVisible: true,
      materialData: handleMaterialData,
    });
  }

  showPickupModule() {
    let deliveryData = this.state.deliveryData;
    let handleMaterialData = this.state.materialData;
    for (let i = 0; i < deliveryData.length; i++) {
      for (let j = 0; j < handleMaterialData.length; j++) {
        if (Number(deliveryData[i]._id) === Number(handleMaterialData[j]._id)) {
          handleMaterialData[j].isCheck = true;
        }
      }
    }
    this.setState({
      pickupModuleVisible: true,
      materialData: handleMaterialData,
    });
  }

  handlePickupModuleCancel() {
    let handleMaterialData = this.calculateMaterialData();
    this.setState({
      pickupModuleVisible: false,
      materialData: handleMaterialData,
    });
  }

  handleApplicationModuleCancel() {
    let handleMaterialData = this.calculateMaterialData();
    this.setState({
      applicationVisible: false,
      materialData: handleMaterialData,
    });
  };

  calculateMaterialData() {
    let handleMaterialData = this.state.materialData;
    for (let j = 0; j < handleMaterialData.length; j++) {
      handleMaterialData[j].isCheck = false;
    }
    return handleMaterialData;
  }

  deleteApplicationData(_id) {
    let handleMaterialData = this.state.materialData;
    let applicationData = this.state.applicationData;

    for (let i = 0; i < handleMaterialData.length; i++) {
      if (Number(handleMaterialData[i]._id) === Number(_id)) {
        handleMaterialData[i].isCheck = false;
      }
      this.setState({
        applicationData: applicationData.filter(applicationData => applicationData._id !== _id),
        materialData: handleMaterialData,
      });
    }
  }

  deleteDeliveryData(_id) {
    let handleMaterialData = this.state.materialData;
    let deliveryData = this.state.deliveryData;

    for (let i = 0; i < handleMaterialData.length; i++) {
      if (Number(handleMaterialData[i]._id) === Number(_id)) {
        handleMaterialData[i].isCheck = false;
      }
      this.setState({
        deliveryData: deliveryData.filter(deliveryData => deliveryData._id !== _id),
        materialData: handleMaterialData,
      });
    }
  }

  handleSureCreateCarPlay() {
    const deliveryData = this.state.deliveryData;
    const applicationData = this.state.applicationData;
    const financeConfig = this.state.financeConfig;

    const application_material_ids = [];
    const pickup_material_ids = [];
    for (let i = 0, len = applicationData.length; i < len; i++) {
      application_material_ids.push(applicationData[i]._id);
    }
    for (let i = 0, len = deliveryData.length; i < len; i++) {
      pickup_material_ids.push(deliveryData[i]._id);
    }
    const strApplication_material_ids = application_material_ids.join(',');
    const strPickup_material_ids = pickup_material_ids.join(',');
    const strabc = JSON.stringify(financeConfig);
    const data = {
      plan_id: this.props.plan_id,
      product_id: this.state.product_id,
      auto_brand_id: this.state.auto_brand_id,
      auto_series_id: this.state.auto_series_id,
      auto_type_id: this.state.auto_type_id,
      out_in_colors: this.state.out_in_colors,
      guide_price: this.state.guide_price,
      displacement: this.state.displacement,
      rent_down_payment: this.state.rent_down_payment,
      monthly_rent: this.state.monthly_rent,
      salvage_value: this.state.salvage_value,
      cash_deposit: this.state.cash_deposit,
      service_fee: this.state.service_fee,
      finance_config: strabc,
      remark: this.state.remark,
      pickup_material_ids: strPickup_material_ids,
      application_material_ids: strApplication_material_ids,
      pay_service_fee_in_down_payment: this.state.pay_service_fee_in_down_payment,
    };
    this.props.editAmountFixPlan(data);
  }

  handleOffOrOnLine() {
    const { planDetailData } = this.props;
    if (String(planDetailData.status) === '0') {
      this.props.actions.planOffline({ plan_id: planDetailData._id });
    } else if (String(planDetailData.status) === '-1') {
      this.props.actions.planOnline({ plan_id: planDetailData._id });
    }
  }

  onApplicationRowChange(part) {
    const { materialData } = this.state;
    materialData.map((item, index) => {
      if (Number(item._id) === Number(part._id)) {
        materialData[index].isCheck = !(materialData[index].isCheck);
      }
    });
    this.setState({ materialData });
    const applicationData = this.state.applicationData;
    if (part.isCheck === true) {
      this.setState({ applicationData: [...applicationData, part] });
    }
    if (part.isCheck === false) {
      this.deleteApplicationData(part._id);
    }
  }

  onPickupRowChange(part) {
    const { materialData } = this.state;
    materialData.map((item, index) => {
      if (Number(item._id) === Number(part._id)) {
        materialData[index].isCheck = !(materialData[index].isCheck);
      }
    });
    this.setState({ materialData });
    const deliveryData = this.state.deliveryData;
    if (part.isCheck === true) {
      this.setState({ deliveryData: [...deliveryData, part] });
    }
    if (part.isCheck === false) {
      this.deleteDeliveryData(part._id);
    }
  }

  render() {
    const {
      productListData,
      brandsData,
      seriesByBrandData,
      typesBySeriesData,
      planDetailData,
    } = this.props;

    const {
      deliveryData, applicationData, financeConfig, makeModuleCar, pickupModuleVisible, materialData,
    } = this.state;
    const productAllDataList = productListData.list;
    const brandsDataList = brandsData.auto_brand_list;
    const seriesByBrandDataList = seriesByBrandData.series;
    const seriesDataType = typesBySeriesData.type;
    const { formItemLayout, formItemLayoutHalf, formItemLayoutThree, formItem_814Half } = Layout;
    const { getFieldDecorator } = this.props.form;
    const self = this;
    const monTableColumns = [
      {
        title: '期限',
        dataIndex: 'finance_length_type',
        key: 'finance_length_type',
        render: value => `${value  }期`,
      }, {
        title: '月供（元）',
        key: 'monthly_payment',
        dataIndex: 'monthly_payment',
        render: (value, record) => (
          <span>
             <Input
               placeholder="请输入"
               onChange={self.change_finance_config.bind(self, record)}
               suffix={<span>元</span>}
               value={value}
             />
          </span>
        ),
      }];
    const monTabledata = financeConfig;

    const resourcesList = [];
    if (productAllDataList) {
      for (let i = 0; i < productAllDataList.length; i++) {
        resourcesList.push(
          <Option
            key={productAllDataList[i]._id}
            value={productAllDataList[i]._id}
            title={productAllDataList[i].name}>
            {productAllDataList[i].name}
          </Option>);
      }
    }
    // 车辆品牌
    const brandsList = [];
    if (brandsDataList) {
      for (let i = 0; i < brandsDataList.length; i++) {
        brandsList.push(
          <Option
            key={`${brandsDataList[i]._id}-${brandsDataList[i].name}`}
            title={brandsDataList[i].name}
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
          </Option>,
        );
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

    const applicationColumns = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width: '120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className: 'center',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className: 'center',
        width: '80',
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'isCheck',
        width: '80',
        render: (value) => (
          <span>
          {value &&
          (<a href="javascript:;">
            <Icon type="check" />
          </a>)
          }
          </span>
        ),
      }];

    const pickupColumns = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width: '120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className: 'center',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className: 'center',
      }, {
        title: '操作',
        key: 'action',
        dataIndex: 'isCheck',
        width: '80',
        render: (value) => (
          <span>
          {value &&
          (<a href="javascript:;">
            <Icon type="check" />
          </a>)
          }
          </span>
        ),
      }];

    const columnsModuleApplication = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width: '120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className: 'center',
        width: '400',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className: 'center',
        width: '80',
      }, {
        title: '操作',
        key: 'action',
        width: '80',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除此项吗?"
            onConfirm={() => this.deleteApplicationData(record._id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
      }];

    const columnsModuleDelivery = [
      {
        title: '材料名称',
        dataIndex: 'name',
        key: 'name',
        width: '120',
      }, {
        title: '材料说明',
        dataIndex: 'remark',
        key: 'remark',
        className: 'center',
        width: '400',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
        className: 'center',
        width: '80',
      }, {
        title: '操作',
        key: 'action',
        width: '80',
        render: (text, record) => (
          <Popconfirm
            title="确定要删除此项吗?"
            onConfirm={() => this.deleteDeliveryData(record._id)}
          >
            <a href="#">删除</a>
          </Popconfirm>
        ),
      }];

    return (
      <div>
        <Row className="head-action-bar-line mb20">
          <Col span={8}>车型方案基本信息</Col>
          <Col span={16}>
            <div className="pull-right">
              <Button type="primary" onClick={this.handleSureCreateCarPlay}>
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
              <Link to={{ pathname: '/new-car/programme-car/new/addVehicle' }}>
                <Button>
                  继续创建
                </Button>
              </Link>
            </div>
          </Col>
        </Row>

        <div className="padding-top-20">
          <Form>
            <FormItem label="产品名称" {...formItemLayoutHalf} >
              {getFieldDecorator('产品名称', {
                rules: [{ required: true, message: '产品名称', whitespace: true }],
                initialValue: planDetailData.product_name,
              })(
                <Input disabled style={styles.width360} />,
              )}
            </FormItem>

            <FormItem label="车辆品牌" {...formItemLayoutHalf}>
              {getFieldDecorator('auto_brand_id', {
                rules: [{ required: true, message: '品牌', whitespace: true }],
                initialValue: planDetailData.auto_brand_id &&
                `${planDetailData.auto_brand_id}-${planDetailData.auto_brand_name}`,
              })(
                <Select
                  showSearch
                  style={styles.width360}
                  placeholder="品牌"
                  onSelect={this.handleBrand}
                >
                  {brandsList}
                </Select>,
              )}

            </FormItem>

            <FormItem label="车系" {...formItemLayoutHalf}>
              {getFieldDecorator('auto_series_id', {
                rules: [{ required: true, message: '车系', whitespace: true }],
                initialValue: planDetailData.auto_series_id,
              })(
                <Select
                  style={styles.width360}
                  placeholder="车系"
                  onSelect={this.handleSeries}
                >
                  {brandsListChildren}
                </Select>,
              )}
            </FormItem>

            <Row>
              <Col span={12} className='mb10'>
                <FormItem label="车型" {...formItemLayout}>
                  <Row>
                    <Col span={10}>
                      {getFieldDecorator('auto_type_id', {
                        rules: [{ required: true, message: '车型', whitespace: true }],
                        initialValue: planDetailData.auto_type_id,
                      })(
                        <Select
                          size="large"
                          placeholder="车型"
                          onSelect={this.handleSeriesType}
                          style={styles.width360}
                          dropdownMatchSelectWidth={false}
                        >
                          {getSeriesByBrandDataTypeList}
                        </Select>,
                      )}

                      <span style={styles.marginLeft}>
                        {getFieldDecorator('auto_type_version')(
                          <span onClick={this.handleCarModule}>
                            <a>自定义车型</a>
                          </span>,
                        )}
                      </span>
                    </Col>
                  </Row>
                </FormItem>
              </Col>
            </Row>

            <FormItem label="外观／内饰" {...formItemLayoutHalf} >
              {getFieldDecorator('out_in_colors', {
                initialValue: planDetailData.out_in_colors,
              })(
                <Input
                  placeholder="请输入外观／内饰颜色。示例：外白内黑；外黑内白"
                  onBlur={this.change_out_in_colors}
                  style={styles.width360}
                />,
              )
              }
            </FormItem>

            <Row>
              <Col span={8}>
                <FormItem label="厂商指导价" {...formItemLayoutThree} >
                  {getFieldDecorator('guide_price', {
                    rules: [{ required: true, message: '厂商指导价', whitespace: true }],
                    initialValue: Number(planDetailData.guide_price).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      type="number"
                      min="1"
                      placeholder="请输入"
                      disabled={true}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="排量" {...formItemLayoutThree} >
                  {getFieldDecorator('displacement', {
                    rules: [{ required: true, message: '排量', whitespace: true }],
                    initialValue: planDetailData.displacement,
                  })(
                    <Input
                      addonAfter={<span style={styles.styleL}>L</span>}
                      type="number"
                      placeholder="请输入"
                      min="1"
                      disabled={true}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem label="首付" {...formItemLayoutThree} >
                  {getFieldDecorator('rent_down_payment', {
                    rules: [{ required: true, message: '首付', whitespace: true }],
                    initialValue: Number(planDetailData.rent_down_payment).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      placeholder="请输入"
                      type="number"
                      min="1"
                      onBlur={this.change_rent_down_payment}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="月租" {...formItemLayoutThree} >
                  {getFieldDecorator('monthly_rent', {
                    rules: [{ required: true, message: '月租', whitespace: true }],
                    initialValue: Number(planDetailData.monthly_rent).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      placeholder="请输入"
                      type="number"
                      min="1"
                      onBlur={this.change_monthly_rent}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="残值" {...formItemLayoutThree}>
                  {getFieldDecorator('salvage_value', {
                    rules: [{ required: false, message: '残值', whitespace: false }],
                    initialValue: Number(planDetailData.salvage_value).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      placeholder="请输入"
                      type="number"
                      min="1"
                      onBlur={this.change_salvage_value}
                    />,
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row>
              <Col span={8}>
                <FormItem label="保证金" {...formItemLayoutThree} >
                  {getFieldDecorator('cash_deposit', {
                    rules: [{ required: false, message: '保证金', whitespace: false }],
                    initialValue: Number(planDetailData.cash_deposit).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      placeholder="请输入"
                      type="number"
                      min="1"
                      onBlur={this.change_cash_deposit}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="服务费" {...formItemLayoutThree} >
                  {getFieldDecorator('service_fee', {
                    rules: [{ required: false, message: '服务费', whitespace: false }],
                    initialValue: Number(planDetailData.service_fee).toFixed(0),
                  })(
                    <Input
                      addonAfter={'元'}
                      placeholder="请输入"
                      type="number"
                      min="1"
                      onBlur={this.change_service_fee}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <Col className="ml20">
                  <FormItem
                    {...formItemLayoutThree}
                  >
                    {getFieldDecorator('pay_service_fee_in_down_payment', {})(
                      <Checkbox
                        checked={this.state.pay_service_fee_in_down_payment == '1'}
                        onChange={this.handlePay}
                      >
                        服务费计入首付
                      </Checkbox>,
                    )}
                  </FormItem>
                </Col>
              </Col>
            </Row>

            <FormItem label="月供设置" {...formItemLayoutHalf} >
              {getFieldDecorator('finance_config', {
                rules: [{ required: true, message: '月供设置', whitespace: false }],
                initialValue: planDetailData.finance_config,
              })(
                <Table
                  style={styles.width360}
                  columns={monTableColumns}
                  dataSource={monTabledata}
                  pagination={false}
                />,
              )}
            </FormItem>

            <FormItem label="可选套餐" {...formItemLayoutHalf} >
              {getFieldDecorator('remark', {
                initialValue: planDetailData.remark,
              })(
                <TextArea
                  style={styles.width360}
                  placeholder="可描述套餐的优惠项，金额等内容"
                  onBlur={this.change_service_remark}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />,
              )
              }
            </FormItem>
          </Form>
        </div>

        <div>
          <Row className="head-action-bar-line mb20">
            <Col span={8}>申请材料</Col>
            <Col span={16}>
              <div className="pull-right">
                <Button onClick={this.showApplicationModule}>
                  添加材料
                </Button>
              </div>
            </Col>

            <Modal
              visible={this.state.applicationVisible}
              onCancel={this.handleApplicationModuleCancel}
              maskClosable={true}
              footer={[]}
              title="申请材料"
            >
              <Table
                columns={applicationColumns}
                dataSource={materialData}
                pagination={true}
                onRowClick={this.onApplicationRowChange}
              />
            </Modal>
          </Row>

          <div>
            <Table
              className="material_table"
              columns={columnsModuleApplication}
              dataSource={applicationData}
              pagination={false}
            />
          </div>

          <Row className="head-action-bar-line mb20" style={{ marginTop: 30 }}>
            <Col span={8}>交车材料</Col>
            <Col span={16}>
              <Button style={{ float: 'right' }} onClick={this.showPickupModule}>
                添加材料
              </Button>
            </Col>
            <Modal
              visible={pickupModuleVisible}
              onCancel={this.handlePickupModuleCancel}
              maskClosable={true}
              footer={null}
              title="交车材料"
            >
              <Table
                columns={pickupColumns}
                dataSource={materialData}
                pagination={true}
                onRowClick={this.onPickupRowChange}
              />
            </Modal>
          </Row>

          <Table
            className="material_table"
            columns={columnsModuleDelivery}
            dataSource={deliveryData}
            pagination={false}
          />
        </div>

        <Modal
          visible={makeModuleCar}
          onCancel={this.cancelCarModule}
          maskClosable={true}
          width={600}
          footer={[
            <Button key="1" onClick={this.cancelCarModule}>
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
              {getFieldDecorator('auto_brand_id', {
                initialValue: planDetailData.auto_brand_id &&
                `${planDetailData.auto_brand_id}-${planDetailData.auto_brand_name}`,
              })(
                <Select placeholder="品牌" disabled style={styles.width218}>
                  {brandsList}
                </Select>,
              )}

            </FormItem>

            <FormItem label="车系" {...formItem_814Half} >
              {getFieldDecorator('auto_series_id', {
                initialValue: planDetailData.auto_series_id,
              })(
                <Select placeholder="车系" disabled style={styles.width218}>
                  {brandsListChildren}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车型" {...formItem_814Half}>
              {getFieldDecorator('auto_type_id_no', {
                rules: [{ required: true, message: '车型', whitespace: true }],
              })(
                <InputGroup size="large">
                  <Col span={12}>
                    <Input
                      defaultValue=""
                      style={styles.width218}
                      placeholder="年款：例如2017款"
                      onBlur={this.change_auto_type_year}
                    />
                  </Col>
                  <Col span={12}>
                    <Input
                      defaultValue=""
                      style={styles.width218}
                      placeholder="车型名称：例如2.1T尊旅 中轴版"
                      onBlur={this.change_auto_type_version}
                    />
                  </Col>
                </InputGroup>,
              )}
            </FormItem>

            <FormItem label="厂商指导价" {...formItem_814Half}>
              {getFieldDecorator('guidePriceModule', {
                rules: FormValidator.getRuleNotNull(),
              })(
                <Input
                  style={styles.width218}
                  addonAfter={'元'}
                  placeholder="厂商指导价"
                  type="number"
                  onBlur={this.handlePriceModuleChange}
                />,
              )}
            </FormItem>

            <FormItem label="排量" {...formItem_814Half}>
              {getFieldDecorator('displacementModule', {
                rules: FormValidator.getRuleNotNull(),
              })(
                <Input
                  style={styles.width218}
                  placeholder="排量"
                  type="number"
                  addonAfter={<span style={styles.styleL}>L</span>}
                  onBlur={this.handleDisplacementModuleChange} />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

EditVehiPlayChildren = Form.create()(EditVehiPlayChildren);

function mapStateToProps(state) {
  const { productListData, materialData } = state.productDate;
  const { brandsData, seriesByBrandData, typesBySeriesData, createLoanPlanResponse, createAutoTypeResponse, planDetailData } = state.programeData;
  return {
    productListData,
    brandsData,
    seriesByBrandData,
    typesBySeriesData,
    createLoanPlanResponse,
    createAutoTypeResponse,
    materialData,
    planDetailData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getBrands,
      createLoanPlan,
      createAmountFixPlan,
      createAutoType,
      getMaterialList,
      getPlanDetail,
      getTypesBySeries,
      planOffline,
      planOnline,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehiPlayChildren);