import React from 'react';
import { Input, Select, Button, Icon } from 'antd';

import createReactClass from 'create-react-class';

import classNames from 'classnames';
import api from '../../middleware/api';

const Option = Select.Option;

const MaintainPartTypeSearchBox = createReactClass({
  getInitialState() {
    return {
      data: this.props.data ? this.props.data : [],
      value: this.props.value ? this.props.value : '',
      focus: false,
    };
  },

  handleOnSuccess(data) {
    this.setState({ value: data.name, data: [data] });

    this.props.select(data);
  },

  handleSelect(value, option) {
    const index = option.props.index;
    const list = this.state.data;
    this.setState({ value: option.props.children });

    this.props.select(list[index]);
  },

  handleSearch(key) {
    this.setState({ value: key });

    if (!!key && key.length >= 2) {
      api.ajax({ url: api.warehouse.part.searchPartTypes(key) }, data => {
        const list = data.res.list;
        if (list.length > 0) {
          this.setState({ data: list });
        } else {
          this.setState({ data: [] });
        }
      });
    } else {
      this.setState({ data: [] });
    }
  },

  handleSubmit() {
    this.handleSearch(this.state.value);
  },

  handleFocus() {
    this.setState({ focus: true });
  },

  handleBlur() {
    this.setState({ focus: false });
  },

  render() {
    const btnCls = classNames({
      'ant-search-btn': true,
      'ant-search-btn-noempty': !!this.state.value.trim(),
    });
    const searchCls = classNames({
      'ant-search-input': true,
      'ant-search-input-focus': this.state.focus,
    });

    return (
      <Input.Group className={searchCls} style={this.props.style}>
        <div id="maintain_part_type_search">
          <Select
            size="large"
            mode="combobox"
            value={this.state.value}
            placeholder={this.props.placeholder}
            defaultActiveFirstOption={false}
            notFoundCountent=""
            getPopupContainer={() => document.getElementById('maintain_part_type_search')}
            optionLabelProp="children"
            showArrow={false}
            filterOption={false}
            onSelect={this.handleSelect}
            onSearch={this.handleSearch}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            disabled={this.props.disabled}
          >
            {this.state.data.map((item, index) => <Option key={index}
                                                          value={item._id}>{item.name}</Option>)}
          </Select>
        </div>
        <div className="ant-input-group-wrap">
          <Button
            className={btnCls}
            onClick={this.handleSubmit}
            size="large">
            <Icon type="search" />
          </Button>
        </div>
      </Input.Group>
    );
  },
});

MaintainPartTypeSearchBox.defaultProps = { placeholder: '用关键字搜索维保配件' };
export default MaintainPartTypeSearchBox;
