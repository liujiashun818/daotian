import React, { Component } from 'react';
import { Table } from 'antd';

const toastClose = require('../../../images/btn_toast_close.png');

export default class SearchProductDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partsInfo: '',
    };
    [
      'handleTableRow',
      'handleCancel',
      'handleSuccess',
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
    this.props.onCancel && this.props.onCancel();
  }

  handleCancel() {
    const { partsInfo } = this.state;
    partsInfo.visible = false;
    this.setState({ partsInfo });
  }

  handleSuccess(data) {
    this.props.onTableRowClick(data);
  }

  handleClick(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  eventListenerFun(e) {
    if (e.target.getAttribute('class') === 'ant-input ant-input-lg') {
      return;
    }
    let { partsInfo } = this.state;
    if (!partsInfo) {
      partsInfo = {};
    }
    partsInfo.visible = false;
    this.setState({ partsInfo });
  }

  render() {
    const { partsInfo } = this.state;
    const dataSource = partsInfo.info ? partsInfo.info : [];

    const columns = [
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
      }, {
        title: '资源方产品',
        dataIndex: 'resource_name',
        key: 'resource_name',
        width: '25%',
      }, {
        title: '区域',
        dataIndex: 'city_name',
        key: 'city_name',
        width: '25%',
      }];

    let style = { display: 'none' };

    if (partsInfo.coordinate) {
      style = {
        position: 'absolute',
        width: '600px',
        left: `${partsInfo.coordinate.left}px` || '',
        top: `${partsInfo.coordinate.top + 10}px` || '',
        display: partsInfo.visible ? '' : 'none',
        zIndex: 9998,
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
          bordered={false}
          pagination={false}
          onRowClick={this.handleTableRow}
          rowKey={record => record._id}
          scroll={{ y: 200 }}
        />
      </div>
    );
  }
}
