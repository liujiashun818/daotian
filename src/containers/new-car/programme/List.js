import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import api from '../../../middleware/api';
import Financial from './Financial';
import Vehicle from './Vehicle';
import { getResourceList } from '../../../reducers/new-car/product/productActions';
import {
  getPlanAllList,
  getPlanDetail,
  getProductList,
  planEditHot,
  planOffline,
  planOnline,
  setFinancialProgramPage,
  setVehicleSchemePage,

  getRegin,
  getProvinces,
} from '../../../reducers/new-car/programe/programeActions';

const TabPane = Tabs.TabPane;
require('./index.less');

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isManager: false,
      productId: '0',
      status: '-2',
      limit: 15,
      guide_price_vehicle: '',
      guide_price_financial: '',
      product_type: '1',
      cityIdFinancial: '',
      cityIdVehicle: '',
      type: '',
    };
    [
      'getPlanDetail',
      'getPlanAllList',
      'handleProductChange',
      'handleStatusChange',
      'handleGuidePriceChange',
      'handleCallback',
      'handleVehicleSchemePage',
      'handleRefresh',
      'handlePlanOffline',
      'handlePlanOnline',
      'editPlanHot',
      'handleFinancialPageChange',
      'getRegin',
      'setCity',
      'getProvinces',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    this.props.actions.getProductList(1);
    const data = {
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.getPlanAllList(data);
  }

  componentDidMount() {
    const isSuperAdministrator = api.isSuperAdministrator();
    if (isSuperAdministrator) {
      this.setState({
        isManager: isSuperAdministrator,
      });
    }
    const isRegionAdministrator = api.isRegionAdministrator();
    if (isRegionAdministrator) {
      this.setState({
        isManager: false,
      });
    }
  }

  getPlanAllList(data) {
    this.props.actions.getPlanAllList(data);
  }

  handleProductChange(id) {
    if (id === 'all') {
      id = '';
    }
    const data = {
      limit: this.state.limit,
      product_id: id,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.setState({
      product_id: id,
      page: 1,
    });
    this.getPlanAllList(data);
    this.props.actions.setVehicleSchemePage(1);
    this.props.actions.setFinancialProgramPage(1);
  }

  handleGuidePriceChange(type, e) {
    const { value } = e.target;
    const data = {
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: value,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };

    if (type === '1') {
      this.setState({
        guide_price_vehicle: value,
      });
    } else {
      this.setState({
        guide_price_financial: value,
      });
    }

    this.getPlanAllList(data);
    this.props.actions.setVehicleSchemePage(1);
    this.props.actions.setFinancialProgramPage(1);
  }

  handleStatusChange(e) {
    const data = {
      skip: this.state.skip,
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: e,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.setState({
      status: e,
    });
    this.getPlanAllList(data);
    this.props.actions.setVehicleSchemePage(1);
    this.props.actions.setFinancialProgramPage(1);
  }

  handleCallback(key) {
    const data = {
      limit: this.state.limit,
      product_id: '0',
      guide_price: key === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: key,
      status: '-2',
      cityId: Number(key) === 2 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.setState({
      product_type: key,
      guide_price: '',
      productId:'0',
      status:'-2',
    });
    this.getPlanAllList(data);
    this.props.actions.getProductList(key);
    this.props.actions.setVehicleSchemePage(1);
    this.props.actions.setFinancialProgramPage(1);
  }

  handleVehicleSchemePage(page) {
    const data = {
      page: page,
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.getPlanAllList(data);
    this.props.actions.setVehicleSchemePage(page);
    this.props.actions.setFinancialProgramPage(1);
  }

  handleFinancialPageChange(page) {
    const data = {
      page: page,
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.getPlanAllList(data);
    this.props.actions.setFinancialProgramPage(page);
    this.props.actions.setVehicleSchemePage(1);
  }

  handleRefresh() {
    const data = {
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId: Number(this.state.product_type) === 2
        ? this.state.cityIdFinancial
        : this.state.cityIdVehicle,
    };
    this.getPlanAllList(data);
    this.props.actions.setFinancialProgramPage(1);
    this.props.actions.setVehicleSchemePage(1);
  }

  handlePlanOffline(productId) {
    this.props.actions.planOffline(productId, this.handleRefresh.bind(this));
  }

  handlePlanOnline(productId) {
    this.props.actions.planOnline(productId, this.handleRefresh.bind(this));
  }

  editPlanHot(data) {
    this.props.actions.planEditHot(data, this.handleRefresh.bind(this));
  }

  getPlanDetail(id) {
    this.props.actions.getPlanDetail(id);
  }

  setCity(cityId) {
    Number(this.state.product_type) === 2
      ? this.setState({ cityIdFinancial: cityId })
      : this.setState({ cityIdVehicle: cityId });

    const data = {
      limit: this.state.limit,
      product_id: this.state.productId,
      guide_price: this.state.product_type === '1'
        ? this.state.guide_price_vehicle
        : this.state.guide_price_financial,
      product_type: this.state.product_type,
      status: this.state.status,
      cityId,
    };

    this.getPlanAllList(data);
  }

  getRegin(selectedOptions) {
    this.props.actions.getRegin(selectedOptions);
  }

  getProvinces() {
    this.props.actions.getProvinces();
  }

  render() {
    const operations = <span>
  	           {this.state.product_type === '1'
                 ? <Link
                   to={{ pathname: '/new-car/programme-car/new/addVehicle' }}
                   target="_blank"
                 >
                   <Button type="primary">创建车型方案</Button></Link>
                 : <Link
                   to={{ pathname: '/new-car/programme-car/new/addFinancial' }}
                   target="_blank"
                 >
                   <Button type="primary">创建金融方案</Button></Link>}
  	            </span>;

    return (
      <div className="pro_header_hei">
        <Tabs defaultActiveKey="1" onChange={this.handleCallback} tabBarExtraContent={operations}>
          <TabPane tab="车型方案" key="1">
            <Vehicle
              onGuidePriceChange={this.handleGuidePriceChange}
              handleProductChange={this.handleProductChange}
              handleStatusChange={this.handleStatusChange}
              product_type={this.state.product_type}
              resourceList={this.props.resourceList}
              planData={this.props.planData}
              isManager={this.state.isManager}
              productId={this.state.productId}
              status={this.state.status}
              planEditHot={this.editPlanHot}
              planOnline={this.handlePlanOnline}
              planOffline={this.handlePlanOffline}
              isFetching={this.props.isFetching}
              setPage={this.handleVehicleSchemePage}
              page={this.props.vehicleChemePage}
              productListData={this.props.productListData}
              getPlanDetail={this.getPlanDetail}
              planDetailData={this.props.planDetailData}

              getRegin={this.getRegin}
              options={this.props.options}
              setCity={this.setCity}
              getProvinces={this.getProvinces}
            />
          </TabPane>

          <TabPane tab="金融方案" key="2">
            <Financial
              onGuidePriceChange={this.handleGuidePriceChange}
              handleProductChange={this.handleProductChange}
              handleStatusChange={this.handleStatusChange}
              product_type={this.state.product_type}
              productId={this.state.productId}
              status={this.state.status}
              resourceList={this.props.resourceList}
              planData={this.props.planData}
              isManager={this.state.isManager}
              planOnline={this.handlePlanOnline}
              planOffline={this.handlePlanOffline}
              productListData={this.props.productListData}
              isFetching={this.props.isFetching}
              setPage={this.handleFinancialPageChange}
              page={this.props.financialProgramPage}

              getRegin={this.getRegin}
              options={this.props.options}
              setCity={this.setCity}
              getProvinces={this.getProvinces}
            />
          </TabPane>
        </Tabs>
      </div>

    );
  }
}

function mapStateToProps(state) {
  const { planData, planEditHotResponse, vehicleChemePage, financialProgramPage, productListData, planDetailData, isFetching, options } = state.programeData;
  const { resourceList } = state.productDate;

  return {
    resourceList,
    isFetching,
    planData,
    planEditHotResponse,
    vehicleChemePage,
    productListData,
    financialProgramPage,
    planDetailData,
    options,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getResourceList,
      getPlanAllList,
      planOnline,
      planOffline,
      planEditHot,
      setVehicleSchemePage,
      setFinancialProgramPage,
      getProductList,
      getPlanDetail,

      getRegin,
      getProvinces,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
