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

import api from '../../../middleware/api';
import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';

import SearchProductDrop from './SearchProductDrop';

import { getProductDetail } from '../../../reducers/new-car/programe/programeActions';
import styles from './style';

const InputGroup = Input.Group;
const { TextArea } = Input;
const FormItem = Form.Item;
const Option = Select.Option;
require('./index.less');

class AddVehicleChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      applicationVisible: false,
      deliveryData: [],
      applicationData: [],
      financeLengthTypes: [],
      product_id: '',
      auto_brand_id: '',
      auto_brand_name: '',
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
      pay_service_fee_in_down_payment: 0,
      auto_series_factory_id: '',
      materialData: [],
      productListData: [],
      productListChoose: {},
      guidePriceModule: '',
      displacementModule: '',
    };
    [
      'showApplicationModule',
      'showPickupModule',
      'handlePickupModuleCancel',
      'handleApplicationModuleCancel',
      'createProduct',
      'getMaterialAndMonthPayment',
      'handleCarModule',
      'handleBrand',
      'handleSeries',
      'handleSeriesType',
      'handleGuideAndDisplacement',
      'handleCancelModule',
      'change_auto_type_version',
      'change_auto_type_year',
      'change_out_in_colors',
      'change_rent_down_payment',
      'change_monthly_rent',
      'change_salvage_value',
      'change_cash_deposit',
      'change_service_fee',
      'change_service_remark',
      'change_finance_config',
      'change_pay',
      'change_displacement',
      'change_guide_price',
      'handleAutoTypeChange',
      'handleRefresh',
      'deleteApplicationData',
      'deleteDeliveryData',
      'handleSubmit',
      'onApplicationRowChange',
      'onPickupRowChange',
      'handleInputFocus',
      'handTableRowClick',
      'handlePriceModuleChange',
      'handleDisplacementModuleChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.product_id !== '' || undefined || null) {
      this.createProduct(this.props.product_id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.materialData !== this.props.materialData) {
      let materialListData2 = nextProps.materialData.list;
      for (let i = 0; i < materialListData2.length; i++) {
        materialListData2[i].isCheck = false;
      }
      this.setState({ materialData: materialListData2 });
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

  showApplicationModule() {
    let { applicationData } = this.state;
    let handleMaterialData = this.state.materialData;
    for (let i = 0; i < applicationData.length; i++) {
      for (let j = 0; j < handleMaterialData.length; j++) {
        if (Number(applicationData[i]._id) === Number(handleMaterialData[j]._id)) {
          handleMaterialData[j].isCheck = true;
          console.log(applicationData[i]._id, handleMaterialData[j]._id);
        }
      }
    }
    this.setState({
      applicationVisible: true,
      materialData: handleMaterialData,
    });
  }

  showPickupModule() {
    let { deliveryData } = this.state;
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
  }

  calculateMaterialData() {
    let handleMaterialData = this.state.materialData;
    for (let j = 0; j < handleMaterialData.length; j++) {
      handleMaterialData[j].isCheck = false;
    }
    return handleMaterialData;
  }

  createProduct(id) {
    this.props.actions.getProductDetail(id, this.getMaterialAndMonthPayment.bind(this));
    this.setState({ product_id: id });
  }

  getMaterialAndMonthPayment(data) {
    this.setState({
      applicationData: data.application_material_list,
      deliveryData: data.pickup_material_list,
      financeLengthTypes: data.detail.finance_length_types
        ? data.detail.finance_length_types.split(',')
        : [],
    });
    this.props.getMaterialList(0, '', data.detail.resource_id);
  }

  handleCarModule(e) {
    const is_have_serise = this.state.auto_series_id;
    this.props.getSeriesByBrand(this.state.auto_brand_id);
    if (is_have_serise) {
      this.setState({
        makeModuleCar: true,
      });
    } else {
      message.error('请选择车辆品牌和车系');
    }
  };

  handleBrand(value) {
    const autoBrandId = value.split('-')[0];
    const auto_brand_name = value.split('-')[1];
    this.setState({
      auto_brand_id: autoBrandId,
      auto_brand_name,
    });
    this.props.form.setFieldsValue({ series: '' });
    this.props.form.setFieldsValue({ auto_type_id: '' });

    this.props.getSeriesByBrand(value);
  }

  handleSeries(value) {
    const toArray = value.split('/');
    const toStringAuto_series_id = toArray[0];
    const toStringAuto_factory_id = toArray[1];
    this.setState({
      auto_series_factory_id: value,
      auto_series_id: toStringAuto_series_id,
      auto_factory_id: toStringAuto_factory_id,
    });
    this.props.form.setFieldsValue({ auto_type_id: '' });
    this.props.getTypesBySeries(value.split('/')[0]);
  }

  handleSeriesType(value) {
    this.setState({
      auto_type_id: value,
    });
    this.handleGuideAndDisplacement(value);
  }

  handleGuideAndDisplacement(id) {
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

  handleCancelModule() {
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
    const { value } = e.target;
    switch (record.name) {
      case '12期':
        this.setState({ finance_length_type12: value });
        break;
      case '24期':
        this.setState({ finance_length_type24: value });
        break;
      case '36期':
        this.setState({ finance_length_type36: value });
        break;
      case '48期':
        this.setState({ finance_length_type48: value });
        break;
      default:
    }
  }

  change_pay(e) {
    if (e.target.checked) {
      this.setState({
        pay_service_fee_in_down_payment: 1,
      });
    }
    if (e.target.checked === false) {
      this.setState({
        pay_service_fee_in_down_payment: 0,
      });
    }
  }

  change_displacement(e) {
    this.setState({
      displacement: e.target.value,
    });
  }

  change_guide_price(e) {
    this.setState({
      guide_price: e.target.value,
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

  handleAutoTypeChange() {
    const data = {
      auto_brand_id: this.state.auto_brand_id,
      auto_factory_id: this.state.auto_factory_id,
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
    this.props.createAutoType(data, autoTypeId => this.handleRefresh(auto_series_id, autoTypeId));
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

  deleteApplicationData(_id) {
    const applicationData = [...this.state.applicationData];
    let handleMaterialData = this.state.materialData;
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
    const deliveryData = [...this.state.deliveryData];
    let handleMaterialData = this.state.materialData;
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

  handleSubmit() {
    const { deliveryData, applicationData, financeLengthTypes } = this.state;
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
    const array_finance_length_type = financeLengthTypes.map(item => ({
      finance_length_type: item,
      monthly_payment: this.state[`finance_length_type${item}`],
    }));
    const str_finance_length_type = JSON.stringify(array_finance_length_type);

    let handleProductId;
    if (this.props.product_id == '' || null || undefined) {
      handleProductId = this.state.productListChoose._id;

      if (!this.state.productListChoose._id) {
        message.error('请选择产品名称');
        return;
      }

    }
    if (this.props.product_id) {
      handleProductId = this.props.product_id;
    }
    const data = {
      product_id: handleProductId,
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
      finance_config: str_finance_length_type,
      remark: this.state.remark,
      pickup_material_ids: strPickup_material_ids,
      application_material_ids: strApplication_material_ids,
      pay_service_fee_in_down_payment: this.state.pay_service_fee_in_down_payment,
    };
    this.props.createAmountFixPlan(data, data => {
      window.location.href = `/new-car/programme-car/new/editVehicle/${data.res.detail._id}`;
    });
  }

  handTableRowClick(value) {
    this.setState({ productListChoose: value });
    this.createProduct(value._id);
  }

  handleInputFocus(e) {
    const { productListData } = this.props;
    const list = productListData.list;

    const coordinate = api.getPosition(e);

    const info = {};
    info.info = list;
    info.coordinate = coordinate;
    info.visible = true;
    this.setState({ productListData: info });
  }

  render() {
    const { productListData, brandsData, seriesByBrandData, typesBySeriesData, product_id, productDetail } = this.props;
    const {
      financeLengthTypes, makeModuleCar, deliveryData, applicationVisible, guide_price, applicationData, displacement, auto_brand_id,
      auto_brand_name, pickupModuleVisible, auto_series_factory_id, materialData, productListChoose,
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
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '月供（元）',
        key: 'action',
        render: (text, record) => (
          <span>
             <Input
               placeholder="请输入"
               onChange={self.change_finance_config.bind(self, record)}
               suffix={<span>元</span>}
             />
          </span>

        ),
      }];

    const monTabledata = financeLengthTypes.map((item, index) => ({
      key: index,
      name: `${item}期`,
    }));
    const product_List_data = [];
    if (productAllDataList) {
      for (let i = 0; i < productAllDataList.length; i++) {
        product_List_data.push(
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
              {`${seriesDataType[i].version  },${  seriesDataType[i].year}`}
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
              <Button
                type="primary"
                onClick={this.handleSubmit}
              >
                确认创建
              </Button>
            </div>
          </Col>
        </Row>

        <div className="padding-top-20">
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
                  />
                </FormItem>

                : <FormItem label="产品名称"{...formItemLayoutHalf} required>
                  <Input
                    value={productDetail.name}
                    style={styles.width360}
                    disabled
                  />
                </FormItem>
            }


            {/*<FormItem label="产品名称"{...formItemLayoutHalf} >
              {getFieldDecorator('product_id', {
                rules: [{ required: true, message: '产品名称', whitespace: true }],
                initialValue: product_id || null,
              })(
                <Select
                  placeholder="产品名称"
                  onChange={this.createProduct.bind(this)}
                  disabled={!!product_id}
                  style={styles.width360}
                  onClick={this.handleSelectFocus}
                  dropdownClassName="hide"
                >
                  {product_List_data}
                </Select>,
              )}
            </FormItem>*/}

            <FormItem label="车辆品牌" {...formItemLayoutHalf} >
              {getFieldDecorator('brand', {
                rules: [{ required: true, message: '品牌', whitespace: true }],
              })(
                <Select
                  showSearch
                  style={styles.width360}
                  placeholder="品牌搜索"
                  onChange={this.handleBrand}
                >
                  {brandsList}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车系" {...formItemLayoutHalf} >
              {getFieldDecorator('series', {
                rules: [{ required: true, message: '车系', whitespace: true }],
              })(
                <Select
                  style={styles.width360}
                  placeholder="车系"
                  onChange={this.handleSeries}
                >
                  {brandsListChildren}
                </Select>,
              )}
            </FormItem>

            <Row>
              <Col span={12} className='mb10'>
                <FormItem label="车型" {...formItemLayout} >
                  <Row>
                    <Col span={10}>
                      {getFieldDecorator('auto_type_id', {
                        rules: [{ required: true, message: '车型', whitespace: true }],
                      })(
                        <Select
                          size="large"
                          style={styles.width360}
                          placeholder="车型"
                          onChange={this.handleSeriesType}
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
              {getFieldDecorator('out_in_colors')(
                <Input
                  style={styles.width360}
                  placeholder="请输入外观／内饰颜色。示例：外白内黑；外黑内白"
                  onBlur={this.change_out_in_colors}
                />,
              )}
            </FormItem>

            <Row>
              <Col span={8}>
                <FormItem label="厂商指导价" {...formItemLayoutThree} >
                  {getFieldDecorator('guide_price', {
                    rules: [{ required: true, message: '厂商指导价', whitespace: true }],
                    initialValue: guide_price,
                  })(
                    <Input
                      addonAfter={'元'}
                      type="number"
                      min="1"
                      placeholder="请输入"
                      disabled={true}
                      onBlur={this.change_guide_price}
                    />,
                  )}
                </FormItem>
              </Col>

              <Col span={8}>
                <FormItem label="排量" {...formItemLayoutThree} >
                  {getFieldDecorator('displacement', {
                    rules: [{ required: true, message: '排量', whitespace: true }],
                    initialValue: displacement,
                  })(
                    <Input
                      addonAfter={<span style={styles.styleL}>L</span>}
                      type="number"
                      min="1"
                      placeholder="请输入"
                      disabled={true}
                      onBlur={this.change_displacement}
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
                <FormItem label="残值" {...formItemLayoutThree} >
                  {getFieldDecorator('salvage_value', {
                    rules: [{ required: false, message: '残值', whitespace: false }],
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
                <FormItem
                  {...formItemLayoutThree}
                >
                  {getFieldDecorator('pay_service_fee_in_down_payment')(
                    <div className="ml20">
                      <Checkbox onChange={this.change_pay}>服务费计入首付</Checkbox>
                    </div>,
                  )}
                </FormItem>
              </Col>
            </Row>
            <FormItem
              label="月供设置"
              {...formItemLayoutHalf}
              hasFeedback
            >
              {getFieldDecorator('service_remark', {
                rules: [{ required: true, message: '月供设置', whitespace: true }],
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
              {getFieldDecorator('main_business')(
                <TextArea
                  style={styles.width360}
                  placeholder="可描述套餐的优惠项，金额等内容"
                  onBlur={this.change_service_remark}
                  autosize={{ minRows: 2, maxRows: 6 }}
                />,
              )}
            </FormItem>
          </Form>
        </div>

        <div>
          <Row className="head-action-bar-line mb20">
            <Col span={8}>申请材料</Col>
            <Col span={16}>
              <div className='pull-right'>
                <Button onClick={this.showApplicationModule}>
                  添加材料
                </Button>
              </div>
            </Col>

            <Modal
              title="申请材料"
              visible={applicationVisible}
              maskClosable={true}
              footer={[]}
              onCancel={this.handleApplicationModuleCancel}
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

          <Row className="head-action-bar-line mb20 mt30">
            <Col span={8}>交车材料</Col>
            <Col span={16}>
              <div className="pull-right">
                <Button onClick={this.showPickupModule}>
                  添加材料
                </Button>
              </div>
            </Col>

            <Modal
              title="交车材料"
              visible={pickupModuleVisible}
              maskClosable={true}
              footer={null}
              onCancel={this.handlePickupModuleCancel}
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
          title="自定义车型"
          visible={makeModuleCar}
          maskClosable={true}
          width={600}
          footer={[
            <Button key="1" onClick={this.handleCancelModule}>取消</Button>,
            <Button key="2" type="primary" onClick={this.handleAutoTypeChange}> 确定</Button>,
          ]}
          onCancel={this.handleCancelModule}
        >
          <Form>
            <FormItem label="车辆品牌" {...formItem_814Half} >
              {getFieldDecorator('auto_brand_id', {
                initialValue: auto_brand_id &&
                `${auto_brand_id}-${auto_brand_name}`,
              })(
                <Select placeholder="品牌" disabled={true} style={styles.width218}>
                  {brandsList}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车系" {...formItem_814Half} >
              {getFieldDecorator('auto_series_id', {
                initialValue: auto_series_factory_id,
              })(
                <Select placeholder="车系" disabled={true} style={styles.width218}>
                  {brandsListChildren}
                </Select>,
              )}
            </FormItem>

            <FormItem label="车型" {...formItem_814Half} >
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
                  placeholder="厂商指导价"
                  style={styles.width218}
                  addonAfter={'元'}
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
                  placeholder="排量" type="number"
                  style={styles.width218}
                  addonAfter={<span style={styles.styleL}>L</span>}
                  onBlur={this.handleDisplacementModuleChange}
                />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddVehicleChild = Form.create()(AddVehicleChild);

function mapStateToProps(state) {
  const { createAutoTypeResponse } = state.programeData;
  return {
    createAutoTypeResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProductDetail,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehicleChild);
