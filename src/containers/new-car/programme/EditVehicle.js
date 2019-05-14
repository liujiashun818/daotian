import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';

import EditVehicleChild from './EditVehicleChild';
import {
  getMaterialList,
  getProductList,
} from '../../../reducers/new-car/product/productActions';
import {
  createAutoType,
  createLoanPlan,
  editAmountFixPlan,
  getBrands,
  getPlanDetail,
  getSeriesByBrand,
  getTypesBySeries,
} from '../../../reducers/new-car/programe/programeActions';

class EditVehiclePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource_id: '',
      status: -2,
      skip: 0,
      limit: 20,
      type: '1',
      plan_id: '',
    };
    [
      'getProductList',
      'getMaterialList',
      'getSeriesByBrand',
      'getTypesBySeries',
      'handleAmountFixPlan',
      'handleAutoTypeChange',
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
  }

  getProductList(data) {
    this.props.actions.getProductList(data);
  }

  getMaterialList(...rest) {
    this.props.actions.getMaterialList(...rest);
  }

  getSeriesByBrand(data) {
    this.props.actions.getSeriesByBrand(data);
  }

  getTypesBySeries(data) {
    this.props.actions.getTypesBySeries(data);
  }

  handleAmountFixPlan(data) {
    this.props.actions.editAmountFixPlan(data);
  }

  handleAutoTypeChange(data, callback) {
    this.props.actions.createAutoType(data,callback);
  }

  render() {
    return (
      <div>
        <EditVehicleChild
          planId={this.props.match.params.id}
          getMaterialList={this.getMaterialList}
          productListData={this.props.productListData}
          brandsData={this.props.brandsData}
          seriesByBrandData={this.props.seriesByBrandData}
          typesBySeriesData={this.props.typesBySeriesData}
          materialData={this.props.materialData}
          createFixPlanResponse={this.props.createFixPlanResponse}
          getSeriesByBrand={this.getSeriesByBrand}
          getTypesBySeries={this.getTypesBySeries}
          editAmountFixPlan={this.handleAmountFixPlan}
          handleAutoTypeChange={this.handleAutoTypeChange}
          editFixPlanResponse={this.props.editFixPlanResponse}
          plan_id={this.state.plan_id}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { productListData, materialData } = state.productDate;
  const { brandsData, seriesByBrandData, typesBySeriesData, createLoanPlanResponse, createFixPlanResponse, editFixPlanResponse } = state.programeData;
  return {
    productListData,
    brandsData,
    seriesByBrandData,
    typesBySeriesData,
    createLoanPlanResponse,
    createFixPlanResponse,
    materialData,
    editFixPlanResponse,
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
      createAutoType,
      getMaterialList,
      getPlanDetail,
      editAmountFixPlan,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVehiclePlay);
