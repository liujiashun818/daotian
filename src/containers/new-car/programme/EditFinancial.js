import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';

import EditFinancialChild from './EditFinancialChild';
import {
  getMaterialList,
  getProductList,
} from '../../../reducers/new-car/product/productActions';
import {
  createAmountFixPlan,
  createAutoType,
  createLoanPlan,
  editLoanPlan,
  getBrands,
  getPlanDetail,
  getSeriesByBrand,
  getTypesBySeries,
  planOffline,
  planOnline,
} from '../../../reducers/new-car/programe/programeActions';

class EditFinancialPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVehicleOrFinancial: false,
      resource_id: '',
      status: -2,
      skip: 0,
      limit: '-1',
      type: '2',
      plan_id: '',
    };
    [
      'getProductList',
      'getSeriesByBrand',
      'getTypesBySeries',
      'getMaterialList',
      'handleLoanPlan',
      'handleAutoTypeChange',
      'handleEditLoanPlan',
      'handlePlanOffline',
      'handlePlanOnline',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const data = {
      skip: this.state.skip,
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resource_id,
      type: this.state.type,
    };
    this.getProductList(data);
    this.props.actions.getBrands();
    const plan_id = this.props.match.params;
    this.setState({
      plan_id: plan_id.id,
    });
    this.props.actions.getPlanDetail(plan_id.id);
  }

  componentDidMount() {
    this.setState({
      isVehicleOrFinancial: false,
    });
  }

  getProductList(data) {
    this.props.actions.getProductList(data);
  }

  getSeriesByBrand(data) {
    this.props.actions.getSeriesByBrand(data);
  }

  getTypesBySeries(data) {
    this.props.actions.getTypesBySeries(data);
  }

  handleLoanPlan(data) {
    this.props.actions.createLoanPlan(data);
  }

  handleAutoTypeChange(data, callback) {
    this.props.actions.createAutoType(data, callback);
  }

  getProductList(data) {
    this.props.actions.getProductList(data);
  }

  handleEditLoanPlan(data) {
    this.props.actions.editLoanPlan(data);

  }

  handlePlanOffline() {
    const { planDetailData } = this.props;
    this.props.actions.planOffline({ plan_id: planDetailData._id });
  }

  handlePlanOnline() {
    const { planDetailData } = this.props;
    this.props.actions.planOnline({ plan_id: planDetailData._id });
  }

  getMaterialList(data) {
    this.props.actions.getMaterialList(data);

  }

  render() {
    return (
      <div>
        <EditFinancialChild
          productListData={this.props.productListData}
          brandsData={this.props.brandsData}
          getProductList={this.getProductList}
          seriesByBrandData={this.props.seriesByBrandData}
          getSeriesByBrand={this.getSeriesByBrand}
          typesBySeriesData={this.props.typesBySeriesData}
          getTypesBySeries={this.getTypesBySeries}
          handleLoanPlan={this.handleLoanPlan}
          createLoanPlanResponse={this.props.createLoanPlanResponse}
          createAutoType={this.handleAutoTypeChange}
          createAutoTypeResponse={this.props.createAutoTypeResponse}
          handleEditLoanPlan={this.handleEditLoanPlan}
          editLoanPlanResponse={this.props.editLoanPlanResponse}
          plan_id={this.state.plan_id}
          planDetailData={this.props.planDetailData}
          getMaterialList={this.getMaterialList}

          planOffline={this.handlePlanOffline}
          planOnline={this.handlePlanOnline}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { productListData, materialData } = state.productDate;
  const { brandsData, seriesByBrandData, typesBySeriesData, createLoanPlanResponse, createFixPlanResponse, createAutoTypeResponse, editLoanPlanResponse, planDetailData } = state.programeData;
  return {
    productListData,
    brandsData,
    seriesByBrandData,
    typesBySeriesData,
    createLoanPlanResponse,
    createFixPlanResponse,
    createAutoTypeResponse,
    materialData,
    editLoanPlanResponse,
    planDetailData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProductList,
      getBrands,
      getSeriesByBrand,
      getTypesBySeries,
      createLoanPlan,
      createAmountFixPlan,
      createAutoType,
      getMaterialList,
      editLoanPlan,
      getPlanDetail,
      planOffline,
      planOnline,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditFinancialPlan);
