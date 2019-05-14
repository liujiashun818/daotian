import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Button, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import api from '../../../middleware/api';

import FinancialList from './Financial';
import VehicleList from './Vehicle';

import {
  editProductOffline,
  editProductOnline,
  getProductList,
  getProvinces,
  getRegin,
  getResourceList,
  setCarProPage,
  setFinancialProPage,
} from '../../../reducers/new-car/product/productActions';

const TabPane = Tabs.TabPane;
require('./index.less');

class Index extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isManager: false,
      type: '1',
      resourceId: '0',
      status: '-2',
      limit: 15,
      cityIdFinancial: '',
      cityIdVehicle: '',
    };

    [
      'getProductList',
      'handleResourcesChange',
      'handleStatusChange',
      'handleCarPageChange',
      'handleFinancialPageChange',
      'handleChange',
      'editProductOffline',
      'editProductOnline',
      'getRegin',
      'setCity',
      'getProvinces',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    this.props.actions.getResourceList(0, '');

    const data = {
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
  }

  componentDidMount() {
    const isSuperAdministrator = api.isSuperAdministrator();
    if (isSuperAdministrator) {
      this.setState({ isManager: isSuperAdministrator });
    }
    const isRegionAdministrator = api.isRegionAdministrator();
    if (isRegionAdministrator) {
      this.setState({ isManager: false });
    }
  }

  getProductList(data) {
    this.props.actions.getProductList(data);
  }

  handleResourcesChange(e) {
    console.log('e',e)
    this.setState({
      resourceId: e,
    });
    const data = {
      limit: this.state.limit,
      status: this.state.status,
      resource_id: e,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
    this.props.actions.setFinancialProPage(1);
    this.props.actions.setCarProPage(1);
  }

  handleStatusChange(e) {
    this.setState({
      status: e,
    });
    const data = {
      limit: this.state.limit,
      status: e,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
    this.props.actions.setFinancialProPage(1);
    this.props.actions.setCarProPage(1);

  }

  handleCarPageChange(page) {
    const data = {
      page: page,
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
    this.props.actions.setCarProPage(page);
    this.props.actions.setFinancialProPage(1);
  }

  handleFinancialPageChange(page) {
    const data = {
      page: page,
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
    this.props.actions.setFinancialProPage(page);
    this.props.actions.setCarProPage(1);
  }

  handleChange(key) {
    this.setState({
      type: key,
      status:'-2',
      resourceId:'0',
    });
    const data = {
      limit: this.state.limit,
      status: '-2',
      resource_id: '0',
      type: key,
      cityId: Number(key) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
    this.props.actions.setFinancialProPage(1);
    this.props.actions.setCarProPage(1);
  }

  editProductOffline(product_id) {
    this.props.actions.editProductOffline(product_id, this.handleRefresh.bind(this));
  }

  editProductOnline(product_id) {
    this.props.actions.editProductOnline(product_id, this.handleRefresh.bind(this));
  }

  handleRefresh() {
    const data = {
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId: Number(this.state.type) === 1 ? this.state.cityIdFinancial : this.state.cityIdVehicle,
    };
    this.getProductList(data);
  }

  setCity(cityId) {
    Number(this.state.type) === 1
      ? this.setState({ cityIdFinancial: cityId })
      : this.setState({ cityIdVehicle: cityId });

    const data = {
      limit: this.state.limit,
      status: this.state.status,
      resource_id: this.state.resourceId,
      type: this.state.type,
      cityId,
    };
    this.getProductList(data);
  }

  getRegin(selectedOptions) {
    this.props.actions.getRegin(selectedOptions);
  }

  getProvinces() {
    this.props.actions.getProvinces();
  }

  render() {
    const { isManager, type, status,resourceId } = this.state;

    const {
      isFetching,
      resourceList,
      productListData,
      carProPage,
      financialProPage,
      options,
    } = this.props;

    const operations = (
      <Link to={{ pathname: `/new-car/product/add/${this.state.type}` }} target="_blank">
        <Button type="primary">{type === '1' ? '创建车型产品' : '创建金融产品'}</Button>
      </Link>
    );

    return (
      <div className="pro_header_hei">
        <Tabs
          defaultActiveKey="1"
          onChange={this.handleChange}
          tabBarExtraContent={api.isSuperAdministrator() && operations}
        >
          <TabPane tab="车型产品" key="1">
            <VehicleList
              isManager={isManager}
              isFetching={isFetching}
              type={type}
              page={carProPage}
              setPage={this.handleCarPageChange}
              resourceList={resourceList}
              productListData={productListData}
              status={status}
              resourceId={resourceId}
              editProductOnline={this.editProductOnline}
              editProductOffline={this.editProductOffline}
              handleResourcesChange={this.handleResourcesChange}
              handleStatusChange={this.handleStatusChange}

              getRegin={this.getRegin}
              options={options}
              setCity={this.setCity}
              getProvinces={this.getProvinces}
            />
          </TabPane>

          <TabPane tab="金融产品" key="2">
            <FinancialList
              type={type}
              isManager={isManager}
              isFetching={isFetching}
              page={financialProPage}
              resourceList={resourceList}
              productListData={productListData}
              status={status}
              resourceId={resourceId}
              setPage={this.handleFinancialPageChange}
              editProductOffline={this.editProductOffline}
              editProductOnline={this.editProductOnline}
              handleStatusChange={this.handleStatusChange}
              handleResourcesChange={this.handleResourcesChange}

              getRegin={this.getRegin}
              options={options}
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
  const {
    isFetching,
    isLoading,
    carProPage,
    financialProPage,
    resourceList,
    productListData,
    offlineResponse,
    onlineResponse,
    options,
  } = state.productDate;
  return {
    isFetching,
    isLoading,
    carProPage,
    financialProPage,
    resourceList,
    productListData,
    offlineResponse,
    onlineResponse,
    options,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getResourceList,
      getProductList,
      editProductOffline,
      editProductOnline,
      setCarProPage,
      setFinancialProPage,
      getRegin,
      getProvinces,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
