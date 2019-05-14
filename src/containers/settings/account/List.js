import React from 'react';
import { Col, Input, Row, Select, Cascader, Alert } from 'antd';

import api from '../../../middleware/api';

import BaseList from '../../../components/base/BaseList';

import New from './New';
import Table from './Table';

const Search = Input.Search;
const Option = Select.Option;

export default class List extends BaseList {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      key: '',
      userType: '-1',
      cityId: '',
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleUserTypeChange = this.handleUserTypeChange.bind(this);
    this.getRegin = this.getRegin.bind(this);
    [
      'handleRegionChange',
      'handleSearchChange',
      'handleUserTypeChange',
      'getRegin',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getProvinces();
  }

  handleSearchChange(e) {
    const value = e.target.value;
    this.setState({ key: value });
  }

  handleUserTypeChange(userType) {
    this.setState({ userType });
  }

  handleRegionChange(value, chooseDetail) {
    this.setState({
      province: value[0] || '',
      cityId: chooseDetail[1] ? chooseDetail[1].city_id : '',
      country: value[2] || '',
    });
  }

  getProvinces() {
    api.ajax({ url: api.admin.system.provinceList() }, data => {
      const provinces = data.res.province_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = false;
        return item;
      });
      this.setState({ options: provinces });
    });
  }

  getRegin(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 获取市
    api.ajax({ url: api.system.getCities(targetOption.name) }, data => {
      targetOption.loading = false;
      targetOption.children = [];
      data.res.city_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = true;
        targetOption.children.push(item);
      });
      this.setState({
        options: [...this.state.options],
      });
    });
  }

  render() {
    const { options } = this.state;
    return (
      <div>
        <Row className="head-action-bar">
          <Col span={20}>
            <Search
              size="large"
              style={{ width: 220 }}
              onChange={this.handleSearchChange}
              placeholder="请输入姓名搜索"
            />

            <label className="label ml20">账号类型</label>
            <Select
              size="large"
              style={{ width: 220 }}
              defaultValue="-1"
              onChange={this.handleUserTypeChange}
            >
              <Option value="-1">全部</Option>
              <Option value="1">连锁店管理员</Option>
              <Option value="2">区域管理员</Option>
              <Option value="3">总公司管理员</Option>
            </Select>

            <span className="label ml20">区域</span>
            <Cascader
              options={options}
              loadData={this.getRegin}
              onChange={this.handleRegionChange}
              changeOnSelect
              style={{ width: 220 }}
              placeholder="请选择地区"
              size="large"
            />
          </Col>
          <Col span={4}>
            <div className="pull-right">
              <New onSuccess={this.handleSuccess} />
            </div>
          </Col>
        </Row>

        <Row className="mb20">
          <Alert
            showIcon
            type="warning"
            message={
              <div>
                <div>总公司管理员可查看并操作稻田系统、水稻优车及水稻管车板块下全部汽修厂、经销商、公司及产品信息</div>
                <div>区域管理员可查看所在区域稻田系统及水稻优车板块下汽修厂、经销商信息</div>
              </div>
            }
          />
        </Row>

        <span className="settings-account">
          <Table
            source={api.admin.account.list(this.state)}
            page={this.state.page}
            reload={this.state.reload}
            updateState={this.updateState}
            onSuccess={this.handleSuccess}
          />
        </span>
      </div>
    );
  }
}
