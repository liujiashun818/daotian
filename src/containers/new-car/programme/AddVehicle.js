import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AddVehicleChild from './AddVehicleChild';

import {
  getMaterialList,
  getProductList,
  getProductDetail,
} from '../../../reducers/new-car/product/productActions';
import {
  getBrands,
  getPlanAllList,
  getSeriesByBrand,
  getTypesBySeries,
  createLoanPlan,
  createAutoType,
  createAmountFixPlan,
} from '../../../reducers/new-car/programe/programeActions';

class AddVehiclePlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVehicleOrFinancial: false,
      resource_id: '',
      product_id: '',
      status: 0,
      skip: 0,
      limit: '',
      type: '1',
    };
    [
      'getProductList',
      'getMaterialList',
      'getSeriesByBrand',
      'getTypesBySeries',
      'handleCreateAmountFixPlan',
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
      cityId:'',
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

  componentDidMount() {
    this.setState({
      isVehicleOrFinancial: false,
    });
  }

  handleCreateAmountFixPlan(data, callback) {
    this.props.actions.createAmountFixPlan(data, callback);
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

  handleAutoTypeChange(data, callback) {
    this.props.actions.createAutoType(data, callback);
  }

  render() {
    return (
      <div>
        <AddVehicleChild
          getTypesBySeries={this.getTypesBySeries}
          getMaterialList={this.getMaterialList}
          getSeriesByBrand={this.getSeriesByBrand}
          createAmountFixPlan={this.handleCreateAmountFixPlan}
          createFixPlanResponse={this.props.createFixPlanResponse}
          createAutoType={this.handleAutoTypeChange}
          productListData={this.props.productListData}
          brandsData={this.props.brandsData}
          seriesByBrandData={this.props.seriesByBrandData}
          typesBySeriesData={this.props.typesBySeriesData}
          materialData={this.props.materialData}
          productDetail={this.props.productDetail}
          product_id={this.state.product_id}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { productListData, materialData, productDetail } = state.productDate;
  const { brandsData, seriesByBrandData, typesBySeriesData, createLoanPlanResponse, createFixPlanResponse, createAutoTypeResponse } = state.programeData;
  return {
    productListData,
    brandsData,
    materialData,
    seriesByBrandData,
    productDetail,
    typesBySeriesData,
    createLoanPlanResponse,
    createFixPlanResponse,
    createAutoTypeResponse,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getProductList,
      getBrands,
      getMaterialList,
      getSeriesByBrand,
      getPlanAllList,
      getProductDetail,
      getTypesBySeries,
      createLoanPlan,
      createAmountFixPlan,
      createAutoType,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVehiclePlay);
