import React from 'react';
import { Row, Select, Cascader, Input } from 'antd';

import BaseList from '../../../components/base/BaseList_';
import SelectTableDrop from '../../../components/widget/SelectTableDrop';

import Table from './FinancialTable';

import styles from './style';

const Option = Select.Option;
const Search = Input.Search;

class ListFinancialProgram extends BaseList {
  constructor(props) {
    super(props);
    this.handleRegionChange = this.handleRegionChange.bind(this);
    this.getRegin = this.getRegin.bind(this);
  }

  componentDidMount() {
    this.props.getProvinces();
  }

  componentWillReceiveProps(nextProps) {
  }

  updatePage(page) {
    this.props.setPage(page);
  }

  handleRegionChange(chooseName, chooseDetail) {
    chooseDetail[1] ? this.props.setCity(chooseDetail[1].city_id) : this.props.setCity('');
  }

  getRegin(selectedOptions) {
    this.props.getRegin(selectedOptions);
  }

  render() {
    const {
      isFetching,
      planData,
      page,
      productListData,
      isManager,
      type,
      planOffline,
      planOnline,
      options,
      productId,
      status,
    } = this.props;
    const getMarketListDataList = productListData.list;

    try {
      if (getMarketListDataList[0]._id !== 'all') {
        getMarketListDataList.unshift({
          name: '全部',
          resource_name: '全部',
          city_name: '全部',
          _id: 'all',
        });
      }
    } catch (e) {
    }

    const columns = [
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        width: '33%',
      }, {
        title: '资源方产品',
        dataIndex: 'resource_name',
        key: 'resource_name',
        width: '33%',
      }, {
        title: '区域',
        dataIndex: 'city_name',
        key: 'city_name',
        width: '33%',
      }];

    return (
      <div>
        <Row className="mb20" type="flex" justify="start">
          <label className="label programme-label">指导价</label>
          <Search onChange={e => this.props.onGuidePriceChange('2', e)} style={styles.width180} />

          <label className="label programme-label ml20">产品名称</label>
          <SelectTableDrop
            inputWidth="180px"
            tableWidth="380px"
            showField="name"
            defaultValue="全部"
            columns={columns}
            dataSource={getMarketListDataList}
            onSelect={detail => this.props.handleProductChange(detail._id)}
          />
          
          <label className="label programme-label ml20">状态</label>
          <Select
            style={styles.width180}
            value={status}
            size="large"
            onChange={e => this.props.handleStatusChange(e)}
          >
            <Option value="-2">全部</Option>
            <Option value="0">使用中</Option>
            <Option value="-1">已下架</Option>
          </Select>

          <label className="label programme-label ml20">区域</label>
          <Cascader
            options={options}
            loadData={this.getRegin}
            onChange={this.handleRegionChange}
            changeOnSelect
            style={{ width: 200 }}
            placeholder="请选择地区"
            size="large"
          />
        </Row>

        <span className="new-car-programme-financial">
          <Table
            updatePage={this.updatePage}
            onSuccess={this.handleSuccess}
            isFetching={isFetching}
            page={page}
            list={planData.list}
            total={parseInt(planData.total)}
            isManager={isManager}
            product_type={type}
            planOffline={planOffline}
            planOnline={planOnline}
          />
        </span>
      </div>
    );
  }
}

export default ListFinancialProgram;
