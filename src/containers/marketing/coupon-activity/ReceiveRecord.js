import React from 'react';
import { Modal } from 'antd';

import api from '../../../middleware/api';
import BaseList from '../../../components/base/BaseList';

import Table from './TableReceiveRecord';

export default class EditCustomerModal extends BaseList {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      visible: false,
      activityId: props.detail.activity_id,
      attendId: props.detail._id,
      nickName: props.detail.nick_name,
    };

    [
      'showModal',
      'hideModal',
    ].map(method => this[method] = this[method].bind(this));
  }

  showModal() {
    this.setState({ visible: true });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  render() {
    const { page, visible, nickName } = this.state;
    return (
      <span>
        <a href="javascript:;" onClick={this.showModal}>领取记录</a>
        <Modal
          title={<span>{nickName} 红包领取记录</span>}
          visible={visible}
          width={720}
          onCancel={this.hideModal}
          footer={null}
        >
          <Table
            page={page}
            source={api.coupon.couponActivityGrabList(this.state)}
            updateState={this.updateState}
            onSuccess={this.handleSuccess}
          />
        </Modal>
      </span>
    );
  }
}
