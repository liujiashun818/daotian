import React from 'react';
import { Col, Row, Select, Cascader } from 'antd';

import BaseList from '../../../components/base/BaseList_';
import Table from './TableIntention';
import styles from './style';

const Option = Select.Option;

class Vehicle extends BaseList {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.getRegin = this.getRegin.bind(this);
  }

  componentDidMount() {
    this.props.getProvinces();
  }

  componentWillReceiveProps() {
  }

  handleRegionChange(chooseName, chooseDetail) {
    chooseDetail[1] ? this.props.setCity(chooseDetail[1].city_id) : this.props.setCity('');
  }

  getRegin(selectedOptions) {
    this.props.getRegin(selectedOptions);
  }

  updatePage(page) {
    this.props.setPage(page);
  }

  render() {
    const { isFetching, resourceList, productListData, page, options } = this.props;
    const getMarketListDataList = resourceList.list;
    const resourcesList = [];

    if (getMarketListDataList) {
      for (let i = 0; i < getMarketListDataList.length; i++) {
        resourcesList.push(
          <Option
            key={getMarketListDataList[i]._id}
            value={getMarketListDataList[i]._id}>
            {getMarketListDataList[i].name}
          </Option>);
      }
    }

    return (
      <div>
        <nav className="mb20">
          <Row>

            <Col className='width-260 pull-left mr20'>
              <label className="label">资源方</label>
              <Select
                value={this.props.resourceId}
                size="large"
                onChange={e => this.props.handleResourcesChange(e)}
                style={styles.width180}
              >
                <Option key="0" defaultValue="0" title="全部">
                  全部
                </Option>
                {resourcesList}
              </Select>
            </Col>

            <Col className="width-260 pull-left ">
              <label className="label">状态</label>
              <Select
                value={this.props.status}
                size="large"
                onChange={e => this.props.handleStatusChange(e)}
                style={styles.width180}
              >
                <Option value="-2">全部</Option>
                <Option value="0">使用中</Option>
                <Option value="-1">已下架</Option>
              </Select>
            </Col>

            <Col className="width-280 pull-left">
              <label className="label ml20">区域</label>
              <Cascader
                options={options}
                loadData={this.getRegin}
                onChange={this.handleRegionChange}
                changeOnSelect
                style={{ width: 200 }}
                placeholder="请选择地区"
                size="large"
              />
            </Col>
          </Row>
        </nav>

        <Table
          updatePage={this.updatePage}
          isFetching={isFetching}
          page={page}
          type={this.props.type}
          list={productListData.list}
          total={parseInt(productListData.total)}
          isManager={this.props.isManager}
          onSuccess={this.handleSuccess}
          editProductOffline={this.props.editProductOffline}
          editProductOnline={this.props.editProductOnline}
        />
      </div>
    );
  }
}

export default Vehicle;
