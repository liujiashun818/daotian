import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';

import AddFinancialChild from './AddFinancialChild';

import {
  getMaterialList,
  getProductList,
  getProductDetail,
} from '../../../reducers/new-car/product/productActions';
import {
  createAmountFixPlan,
  createAutoType,
  createLoanPlan,
  getBrands,
  getSeriesByBrand,
  getTypesBySeries,
} from '../../../reducers/new-car/programe/programeActions';

class AddFinancialPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resource_id: '',
      status: 0,
      skip: 0,
      limit: '-1',
      type: '2',
      product_id: '',
    };
    [
      'getProductList',
      'getSeriesByBrand',
      'getTypesBySeries',
      'handleLoanPlan',
      'handleAutoTypeChange',
      'getMaterialList',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const data = {
      skip: this.state.skip,
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resource_id,
      type: this.state.type,
      cityId: '',
    };
    this.getProductList(data);
    this.props.actions.getBrands();
    const product_id = this.props.match.params;
    if (product_id.id !== undefined) {
      this.setState({
        product_id: product_id.id,
      });
      this.props.actions.getProductDetail(product_id.id);
    }
  }

  getProductList(data) {
    this.props.actions.getProductList(data);
  }

  getSeriesByBrand(value) {
    this.props.actions.getSeriesByBrand(value);
  }

  getTypesBySeries(value) {
    this.props.actions.getTypesBySeries(value);
  }

  handleLoanPlan(value, callback) {
    this.props.actions.createLoanPlan(value, callback);
  }

  handleAutoTypeChange(data, callback) {
    this.props.actions.createAutoType(data, callback);
  }

  getMaterialList(data) {
    this.props.actions.getMaterialList(data);
  }

  render() {
    return (
      <div>
        <AddFinancialChild
          getProductList={this.getProductList}
          getSeriesByBrand={this.getSeriesByBrand}
          getTypesBySeries={this.getTypesBySeries}
          getMaterialList={this.getMaterialList}
          createLoanPlan={this.handleLoanPlan}
          handleAutoTypeChange={this.handleAutoTypeChange}
          productListData={this.props.productListData}
          brandsData={this.props.brandsData}
          seriesByBrandData={this.props.seriesByBrandData}
          typesBySeriesData={this.props.typesBySeriesData}
          createLoanPlanResponse={this.props.createLoanPlanResponse}
          createAutoTypeResponse={this.props.createAutoTypeResponse}
          productDetail={this.props.productDetail}
          planDetailData={this.propsgetPlanDetailData}
          product_id={this.state.product_id}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { productListData, materialData, productDetail } = state.productDate;
  const { brandsData, seriesByBrandData, typesBySeriesData, createLoanPlanResponse, createFixPlanResponse, createAutoTypeResponse, planDetailData } = state.programeData;
  return {
    productListData,
    brandsData,
    seriesByBrandData,
    typesBySeriesData,
    planDetailData,
    materialData,
    productDetail,
    createAutoTypeResponse,
    createFixPlanResponse,
    createLoanPlanResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProductList,
      getBrands,
      getSeriesByBrand,
      getTypesBySeries,
      getMaterialList,
      getProductDetail,
      createLoanPlan,
      createAmountFixPlan,
      createAutoType,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFinancialPlan);
