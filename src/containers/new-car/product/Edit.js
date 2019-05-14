import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Tabs } from 'antd';

import api from '../../../middleware/api';

import EditBasicInformation from './EditBasicInformation';
import EditControlRequire from './EditControlRequire';
import EditFinancingInformation from './EditFinancingInformation';
import EditMaterialSetting from './EditMaterialSetting';

import {
  amountFixFinance,
  createProduct,
  createResource,
  editLoanFinance,
  editMaterial,
  editProduct,
  editRisk,
  getMaterialList,
  getProductDetail,
  getResourceList,
} from '../../../reducers/new-car/product/productActions';

const TabPane = Tabs.TabPane;
require('./index.less');

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: '',
      isManager: false,
    };
    [
      'getResourceList',
      'getMaterialList',
      'editLoanFinance',
      'editRisk',
      'createProduct',
      'handleAmountFixFinance',
      'handleResourcesList',
      'handleMaterial',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const product_id = this.props.match.params;
    this.setState({
      product_id: product_id.id,
    });
    this.props.actions.getProductDetail(product_id.id);
    const isRegionAdministrator = api.isRegionAdministrator();
    if (isRegionAdministrator) {
      this.setState({
        isManager: true,
      });
    }
  }

  componentDidMount() {
    this.getResourceList();
  }

  getResourceList() {
    this.props.actions.getResourceList(0, -1);
  }

  getMaterialList(...value) {
    this.props.actions.getMaterialList(...value);
  }

  createProduct(values) {
    this.props.actions.createProduct(values);
  }

  editRisk(data) {
    this.props.actions.editRisk(data);
  }

  handleAmountFixFinance(data) {
    this.props.actions.amountFixFinance(data);
  }

  editLoanFinance(data) {
    this.props.actions.editLoanFinance(data);
  }

  handleResourcesList(value) {
    this.props.actions.getMaterialList(0, -1, value);
  }

  handleMaterial(data) {
    this.props.actions.editMaterial(data);
  }

  render() {
    return (
      <div className="newCar_product">
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="default"
        >
          <TabPane tab="基本信息" key="1">
            <EditBasicInformation
              getMaterialList={this.getMaterialList}
              getResourceList={this.getResourceList}
              createProduct={this.createProduct}
              createProductResponse={this.props.createProductResponse}
              createResource={this.createResource}
              editProduct={this.props.actions.editProduct}
              handleResourcesList={this.handleResourcesList}
              resourceList={this.props.resourceList}
              resourceCreateResponse={this.props.resourceCreateResponse}
              productDetail={this.props.productDetail}
              isManager={this.state.isManager}
              product_id={this.state.product_id}
            />
          </TabPane>

          <TabPane tab="风控要求" key="2">
            <EditControlRequire
              editRisk={this.editRisk}
              createProductResponse={this.props.createProductResponse}
              productDetail={this.props.productDetail}
              isManager={this.state.isManager}
              product_id={this.state.product_id}
            />
          </TabPane>

          <TabPane tab="融资信息" key="3">
            <EditFinancingInformation
              createProductResponse={this.props.createProductResponse}
              amountFixFinance={this.handleAmountFixFinance}
              amountFixFinanceResponse={this.props.amountFixFinanceResponse}
              editLoanFinance={this.editLoanFinance}
              editRiskResponse={this.props.editRiskResponse}
              productDetail={this.props.productDetail}
              isManager={this.state.isManager}
              product_id={this.state.product_id}
            />
          </TabPane>

          <TabPane tab="材料设置" key="4">
            <EditMaterialSetting
              getMaterialList={this.getMaterialList}
              editMaterial={this.handleMaterial}
              editMaterialResponse={this.props.editMaterialResponse}
              productDetail={this.props.productDetail}
              materialData={this.props.materialData}
              productInfo={this.props.productInfo}
              isManager={this.state.isManager}
              product_id={this.state.product_id}
            />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    resourceList,
    createProductResponse,
    editRiskResponse,
    amountFixFinanceResponse,
    editLoanFinanceResponse,
    materialData,
    editMaterialResponse,
    resourceCreateResponse,
    financingResponse,
    productDetail,
    productInfo,
  } = state.productDate;
  return {
    resourceList,
    createProductResponse,
    editRiskResponse,
    amountFixFinanceResponse,
    editLoanFinanceResponse,
    materialData,
    editMaterialResponse,
    resourceCreateResponse,
    financingResponse,
    productDetail,
    productInfo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getResourceList,
      getMaterialList,
      getProductDetail,
      createProduct,
      createResource,
      editRisk,
      editLoanFinance,
      editProduct,
      editMaterial,
      amountFixFinance,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
