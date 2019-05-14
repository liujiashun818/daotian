import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Input, message } from 'antd';

import classNames from 'classnames';

// 属性类型
const propTypes = {
  placeholder: PropTypes.string,          // 关键词输入的占位符
  defaultKey: PropTypes.string,           // 默认的搜索关键词
  keyValidator: PropTypes.func,           // 搜索关键词的验证
  validateFailMsg: PropTypes.string,      // 验证未通过时的报错信息
  onSearch: PropTypes.func.isRequired,    // 当进行搜索时
  autoSearchLength: PropTypes.number,     // 自动搜索长度
};

// 默认属性
const defaultProps = {
  placeholder: '请输入关键词',
  defaultKey: '',
  keyValidator: null,
  validateFailMsg: '输入验证未通过！',
  onSearch: (key, callback) => {
    callback([]);
  },
  autoSearchLength: 0,        // 默认自动搜索
};

// 组件
class SearchBox extends Component {
  constructor(props) {
    super(props);
    // 状态
    this.state = {
      key: props.defaultKey || '',    // 搜索关键词
      searching: false,               // 搜索状态
    };
    // 自动绑定
    [
      'onKeyChange',
      'handleFocus',
      'handleBlur',
      'onSearch',
      '_onSearchSuccess',
      '_onSearchFail',
    ].forEach(method => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isSearching !== nextProps.isSearching) {
      this.setState({ searching: nextProps.isSearching });
    }
  }

  handleFocus() {
    this.setState({ focus: true });
  }

  handleBlur() {
    this.setState({ focus: false });
  }

  onSearch() {
    this.search(this.state.key);
  }

  onKeyChange(e) {
    // 输入变化
    // 自动搜索
    const newKey = e.target.value;
    if (newKey.length >= this.props.autoSearchLength) {
      this.search(newKey);
    } else {
      this.setState({
        key: newKey,
      });
    }
  }


  _onSearchSuccess() {
    this.setState({
      searching: false,
    });
  }

  _onSearchFail(error) {
    message.error(error);
    this.setState({
      searching: false,
    });
  }

  search(key) {
    key = key.trim();
    const keyValidator = this.props.keyValidator;
    if (typeof(keyValidator) == 'function' && !keyValidator(key)) {
      this.setState({
        key,
      });
      message.error(this.props.validateFailMsg);
    } else {
      this.setState({
        key,
        searching: true,
      });
      this.props.onSearch(key, this._onSearchSuccess, this._onSearchFail);
    }
  }

  clear() {
    this.sesState({
      key: this.props.defaultKey || '',   // 搜索关键词
      searching: false,                   // 搜索状态
    });
  }

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.key.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    const { placeholder } = this.props;
    const { key, searching } = this.state;

    return (
      <Input.Group className={searchCls} style={this.props.style}>
        <Input
          size="large"
          placeholder={placeholder}
          value={key}
          onChange={this.onKeyChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onPressEnter={this.handleSearch}
        />
        <div className="ant-input-group-wrap">
          <Button
            style={{ minWidth: 28 }}
            icon="search"
            className={btnCls}
            size="large"
            loading={searching}
            onClick={this.onSearch}
          />
        </div>
      </Input.Group>
    );
  }
}

SearchBox.propTypes = propTypes;
SearchBox.defaultProps = defaultProps;

export default SearchBox;

// usage 用法示例
/*
 import React, {Component} from 'react'

 import api from '../../../middleware/api'
 import validator from '../../../middleware/validator'
 import SearchBox from './SearchBox'


 export default class HCComponentTest extends Component {
 render() {

 let keyValidator = function (key) {
 return validator.number(key);
 };

 let onSearch = function (key, successHandle, failHandle) {
 let url = api.aftersales.searchMaintainCustomerList() + key;
 api.ajax({url}, (data) => {
 if (data.code === 0) {
 successHandle();
 } else {
 failHandle(data.msg);
 }
 }, (error) => {
 failHandle(error);
 })
 };

 return (
 <SearchBox
 style={{width: 250}}
 placeholder={'请输入手机号'}
 defaultKey={'hahaha'}
 keyValidator={keyValidator}
 validateFailMsg={"请输入手机号查询"}
 onSearch={onSearch}
 autoSearchLength={3}
 />
 );
 }
 }

 */
