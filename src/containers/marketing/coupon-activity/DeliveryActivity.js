import React from 'react';
import { Col, message, Row } from 'antd';

import QRCode from 'qrcode.react';
import BaseList from '../../../components/base/BaseList';
import TablePushList from './TablePushList';
import api from '../../../middleware/api';

import Delivery from './Delivery';

export default class DeliveryActivity extends BaseList {
  constructor(props) {
    super(props);
    this.state = {
      id: props.activityId,
      page: 1,
      detail: {},
    };
    [
      'handleClick',
      'handleCopyUrl',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getDetail();
  }

  handleSaveFile(data, filename) {
    const saveLink = document.createElement('a');
    saveLink.href = data;
    saveLink.download = filename;

    const event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    saveLink.dispatchEvent(event);
  }

  handleFixType(type) {
    type = type.toLowerCase().replace(/jpg/i, 'jpeg');
    const r = type.match(/png|jpeg|bmp|gif/)[0];
    return `image/${  r}`;
  }

  handleClick() {
    const { detail } = this.state;
    const canvas = this.qrCode.refs.canvas.toDataURL('image/png');
    const imgData = canvas.replace(this.handleFixType('png'), 'image/octet-stream');
    const filename = `${detail.title  } 二维码` + '.' + 'png';
    this.handleSaveFile(imgData, filename);
  }

  handleCopyUrl() {
    const url = this.url;
    url.select();
    try {
      if (document.execCommand('copy', false, null)) {
        message.success('复制成功');
      } else {
        message.success('复制失败');
      }
    } catch (err) {
      message.success('复制失败');
    }
  }

  getDetail() {
    const id = this.props.activityId;
    api.ajax({
      url: api.coupon.couponActivityDetail({ id }),
    }, data => {
      const { detail } = data.res;
      this.setState({ detail });
    });
  }

  render() {
    const { page, reload, detail } = this.state;

    return (
      <div className="delivery-activity">
        <div className="line" />
        <label
          className="mb10 mr20"
          style={{ fontWeight: 'bolder', display: 'inline-block' }}
        >
          投放活动
        </label>
        <span className="font-size-14 mb10 grey-999">您可选择复制该链接转发或下载二维码制作门店活动物料</span>
        <div className="mb15">
          <span className="label font-size-14 grey-999" style={{ marginLeft: '14px' }}>链接</span>
          <input
            className="font-size-14"
            style={{ border: 'none', outline: 'none', width: '510px', color: '#999' }}
            value={detail.url}
            ref={url => this.url = url}
          />
          <a
            href="javascript:;"
            className="font-size-14"
            onClick={this.handleCopyUrl}
          >
            复制链接
          </a>
          <br />
        </div>

        <div className="mb20">
          <span className="label grey-999" style={{ verticalAlign: 'top' }}>二维码</span>
          <span
            style={{
              padding: '10px',
              display: 'inline-block',
              border: '1px solid rgba(225, 225, 225, 1)',
              verticalAlign: 'top',
            }}
          >
            <QRCode
              value={detail.url || ''}
              size={100}
              ref={qrCode => this.qrCode = qrCode}
            />
          </span>

          <a
            href="javascript:;"
            className="ml10 font-size-14"
            onClick={this.handleClick}
          >
            下载二维码
          </a>
        </div>
        <div className="line" />

        <div>
          <div className="clearfix mb30">
            <span className="pull-right">
              <Delivery detail={detail} onSuccess={this.handleSuccess} />
            </span>
          </div>
          <div className="line" />

          <Row className="mb15 mt20">
            <Col span={12}>
              <h3>推送记录</h3>
            </Col>
          </Row>

          <TablePushList
            page={page}
            source={api.coupon.couponActivityPushList(this.state)}
            updateState={this.updateState}
            reload={reload}
          />
        </div>
      </div>
    );
  }
}
