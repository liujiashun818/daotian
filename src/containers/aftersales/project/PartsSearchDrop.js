import React, { Component } from 'react';
import { Table } from 'antd';

const toastClose = require('../../../images/btn_toast_close.png');

export default class SearchDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsInfo: '',
    };
    [
      'handleTableRow',
      'handleCancel',
      'eventListenerFun',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    document.addEventListener('click', this.eventListenerFun, false);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.partsInfo) {
      this.setState({ partsInfo: nextProps.partsInfo });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.eventListenerFun, false);
  }

  handleTableRow(value) {
    this.handleCancel();
    this.props.onTableRowClick(value);
  }

  handleCancel() {
    const { partsInfo } = this.state;
    partsInfo.visible = false;
    this.props.onCancel();
    this.setState({ partsInfo });
  }

  handleClick(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  eventListenerFun() {
    let { partsInfo } = this.state;
    if (!partsInfo) {
      partsInfo = {};
    }
    partsInfo.visible = false;
    this.setState({ partsInfo });
    this.props.onCancel();
  }

  render() {
    const { partsInfo } = this.state;

    const dataSource = partsInfo.info ? partsInfo.info : [];

    const columns = [
      {
        title: '配件名',
        dataIndex: 'name',
        key: 'name',
        width: '20%',
      }, {
        title: '配件号',
        dataIndex: 'part_no',
        key: 'part_no',
        width: '20%',

      }, {
        title: '规格',
        dataIndex: 'spec',
        key: 'spec',
        width: '15%',
        render: (value, record) => `${value}${record.unit}`,
      }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
        width: '15%',

      }, {
        title: '适用车型',
        dataIndex: 'scope',
        key: 'scope',
        width: '15%',

      }, {
        title: '剩余库存',
        dataIndex: 'amount',
        key: 'amount',
        width: '15%',
        render: (value, record) => Number(value) - Number(record.freeze),
      }];

    let style = { display: 'none' };

    if (partsInfo.coordinate) {
      style = {
        position: 'absolute',
        width: '800px',
        left: `${partsInfo.coordinate.left}px` || '',
        top: `${partsInfo.coordinate.top + 10}px` || '',
        display: partsInfo.visible ? '' : 'none',
        zIndex: 9999,
        backgroundColor: 'white',
      };
    }

    return (
      <div style={style} onClick={this.handleClick}>
        <img src={toastClose} className="close" onClick={this.handleCancel} />
        <Table
          dataSource={dataSource}
          columns={columns}
          size="small"
          pagination={false}
          onRowClick={this.handleTableRow}
          rowKey={record => record._id}
          scroll={{ y: 180 }}
        />
      </div>
    );
  }
}
