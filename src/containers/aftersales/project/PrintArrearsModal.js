import React from 'react';
import { Button, Icon, message, Modal } from 'antd';
import BaseModal from '../../../components/base/BaseModal';
import PrintArrears from './PrintArrears';
import api from '../../../middleware/api';

export default class PrintArrearsModal extends BaseModal {
  constructor(props) {
    super(props);
    this.state = { visible: false };
    [
      'handleSettlement',
      'getUserAuto',
    ].map(method => this[method] = this[method].bind(this));
  }

  onSuccess(data) {
    this.props.onSuccess(data);
    this.hideModal();
  }

  hideModal() {
    const { isReload } = this.props;
    isReload && location.reload();
    this.setState({ visible: false });
  }

  showModal() {
    this.setState({ visible: true });
    const { project, items, parts } = this.props;

    if (!!items) {
      this.setState({ items, parts });
    } else {
      this.getMaintainItemList(project._id);
      this.getMaintainPartList(project._id);
    }

    this.getUserAuto(project.customer_id, project.auto_id);
  }

  handleSettlement() {
    const { project, payMethod, items, parts } = this.props;

    const payTypeList = [];
    payMethod.map(item => {
      payTypeList.push({ pay_type: item.method, amount: item.money });
    });

    const data = {
      _id: project._id,
      customer_id: project.customer_id,
      next_pay_date: project.next_pay_date,
      pay_type_list: JSON.stringify(payTypeList),
      id_card_num: project.idCardNum,
    };

    const url = String(project.pay_status) === '1'
      ? api.aftersales.payProjectOnRepayment()
      : api.aftersales.payProjectOnAccount();

    api.ajax({
        url,
        type: 'POST',
        data,
      }, () => {
        message.success('挂账成功');
        this.showModal();
      }, err => {
        message.error(err);
      },
    );

    if (!!items) {
      this.setState({ items, parts });
    } else {
      this.getMaintainItemList(project._id);
      this.getMaintainPartList(project._id);
    }
  }

  getMaintainItemList(intention_id = '') {
    api.ajax({ url: api.aftersales.getItemListOfMaintProj(intention_id) }, data => {
      const items = new Map();
      for (let i = 0; i < data.res.list.length; i++) {
        items.set(data.res.list[i].item_id, data.res.list[i]);
      }
      this.setState({ items });
    });
  }

  getMaintainPartList(intention_id = '') {
    api.ajax({ url: api.aftersales.getPartListOfMaintProj(intention_id) }, data => {
      const parts = new Map();
      for (let i = 0; i < data.res.list.length; i++) {
        parts.set(data.res.list[i]._id, data.res.list[i]);
      }
      this.setState({ parts });
    });
  }

  getUserAuto(customer_id, auto_id) {
    api.ajax({ url: api.auto.detail(customer_id, auto_id) }, data => {
      this.setState({ auto: data.res.detail });
    });
  }

  render() {
    const { type } = this.props;

    const { items, parts, auto } = this.state;

    return (
      <span className="center">
        {
          type === 'button' ?
            <Button className="ml10" onClick={this.handleSettlement}>结算并打印挂账单</Button> :
            <p onClick={this.showModal} style={{ width: '120px' }}>打印挂账单</p>
        }

        <Modal
          title={<span><Icon type="file" /> 挂账单预览</span>}
          visible={this.state.visible}
          width="980px"
          onCancel={this.hideModal}
          footer={null}
        >
          <PrintArrears
            project={this.props.project}
            customer={this.props.customer}
            materialFee={this.props.materialFee}
            timeFee={this.props.timeFee}
            auto={auto}
            items={items}
            parts={parts}
            realTotalFee={this.props.realTotalFee}
            bets={this.props.debts}
          />
        </Modal>
      </span>
    );
  }
}
