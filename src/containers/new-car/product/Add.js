import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

import AddBasicInformation from './AddBasicInformation';
import AddControlRequire from './AddControlRequire';
import AddFinancingInformation from './AddFinancingInformation';
import AddMaterialSetting from './AddMaterialSetting';

import {
  amountFixFinance,
  createProduct,
  createResource,
  editLoanFinance,
  editMaterial,
  editRisk,
  editProduct,
  getMaterialList,
  getProductDetail,
  getResourceList,

  getProvinces,
  getRegin,
} from '../../../reducers/new-car/product/productActions';

const TabPane = Tabs.TabPane;
require('./index.less');

class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeKey: '1',
      page: 1,
      resourceId: '',
      basicKey:'',
    };

    [
      'getResourceList',
      'getMaterialList',
      'createResource',
      'createProduct',
      'editProduct',
      'editRisk',
      'editLoanFinance',
      'handleTable',
      'handleAmountFixFinance',
      'handleMaterial',
      'getMaterialListSet',
      'getRegin',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getResourceList();
    this.props.actions.getProvinces();
  }

  handleTable(value) {
    this.setState({ activeKey: value });
  }
  handleTableChange(value){
    this.setState({
      activeKey: value,
      basicKey:value,
    });

  }
  getResourceList() {
    this.props.actions.getResourceList(0, '-1');
  }

  //todo
  getMaterialList(value) {
    const condition = {
      resourceId: value,
      page: 0,
      limit: '',
    };
    this.props.actions.getMaterialList(condition.page, condition.limit, condition.resourceId);
    this.setState({ resourceId: value });
  }

  getMaterialListSet() {
    this.props.actions.getMaterialList(0, -1, this.state.resourceId);
  }

  createProduct(values) {
    this.props.actions.createProduct(values, this.handleTableChange.bind(this));
  }
  editProduct(values){
    this.props.actions.editProduct(values, this.handleTableChange.bind(this));
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

  handleMaterial(data) {
    this.props.actions.editMaterial(data);
  }

  createResource(data) {
    this.props.actions.createResource(data);
  }

  getRegin(selectedOptions) {
    this.props.actions.getRegin(selectedOptions);
  }

  render() {
    const { activeKey,basicKey } = this.state;

    return (
      <div className="newCar_product">
        <Tabs
          activeKey={activeKey}
          onTabClick={this.handleTable.bind(this)}
          type="card"
        >
          <TabPane tab="基本信息" key="1">
            <AddBasicInformation
              resourceCreateResponse={this.props.resourceCreateResponse}
              createProductResponse={this.props.createProductResponse}
              productDetail={this.props.productDetail}
              options={this.props.options}
              type={this.props.match.params.id}
              resourceList={this.props.resourceList}
              getResourceList={this.getResourceList}
              getMaterialList={this.getMaterialList}
              createProduct={this.createProduct}
              editProduct={this.editProduct}
              createResource={this.createResource}

              getRegin={this.getRegin}
              basicKey={basicKey}
            />
          </TabPane>
          <TabPane
            tab="风控要求"
            key="2"
            disabled={!!(this.props.createProductResponse === '' || null)}
          >
            <AddControlRequire
              editRisk={this.editRisk}
              createProductResponse={this.props.createProductResponse}
              type={this.props.match.params.id}
            />
          </TabPane>
          <TabPane
            tab="融资信息"
            key="3"
            disabled={!!(this.props.createProductResponse === '' || null)}
          >
            <AddFinancingInformation
              createProductResponse={this.props.createProductResponse}
              amountFixFinance={this.handleAmountFixFinance}
              amountFixFinanceResponse={this.props.amountFixFinanceResponse}
              editLoanFinance={this.editLoanFinance}
              editRiskResponse={this.props.editRiskResponse}
              type={this.props.match.params.id}
              editProduct={this.props.actions.editProduct}
            />
          </TabPane>
          <TabPane
            tab="材料设置"
            key="4"
            disabled={!!(this.props.createProductResponse === '' || null)}
          >
            <AddMaterialSetting
              materialData={this.props.materialData}
              editMaterialResponse={this.props.editMaterialResponse}
              editMaterial={this.handleMaterial}
              createProductResponse={this.props.createProductResponse}
              getMaterialList={this.getMaterialListSet}
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
    materialData,
    productDetail,
    editRiskResponse,
    amountFixFinanceResponse,
    editLoanFinanceResponse,
    editMaterialResponse,
    createProductResponse,
    resourceCreateResponse,
    financingResponse,
    options,
  } = state.productDate;
  return {
    materialData,
    resourceList,
    productDetail,
    createProductResponse,
    editRiskResponse,
    amountFixFinanceResponse,
    editLoanFinanceResponse,
    editMaterialResponse,
    resourceCreateResponse,
    financingResponse,
    options,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getResourceList,
      getMaterialList,
      getProductDetail,
      createResource,
      createProduct,
      editRisk,
      editLoanFinance,
      editMaterial,
      editProduct,
      amountFixFinance,
      getProvinces,
      getRegin,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
