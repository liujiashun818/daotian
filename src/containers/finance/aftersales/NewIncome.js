import React from 'react';
import { Modal, Icon, Button, Form, Row, Col, message } from 'antd';
import QRCode from 'qrcode.react';

import api from '../../../middleware/api';
import BaseModal from '../../../components/base/BaseModal';
import Layout from '../../../utils/FormLayout';

const FormItem = Form.Item;

class FNewIncomingModal extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      id: '',
      statement: {},
    };
  }

  componentDidMount() {
    api.ajax({ url: api.finance.newIncomeStatement() }, data => {
      if (data.code === 0) {
        const statement = data.res.check_sheet;
        this.setState({ statement, id: statement._id });
      }
    });
  }

  // refresh income statement every 2 seconds to get confirmed sa/finance id
  getLatestStatementInfo() {
    api.ajax({ url: api.finance.getIncomeStatementDetail(this.state.id) }, data => {
      if (data.code === 0) {
        const statement = data.res.check_sheet;
        this.setState({ statement });
      }
    });
  }

  showModal() {
    this.setState({ visible: true });
    this.interval = setInterval(this.getLatestStatementInfo.bind(this), 2000);
  }

  hideModal() {
    this.setState({ visible: false });
    clearInterval(this.interval);
  }

  handleSubmit() {
    const formData = this.props.form.getFieldsValue();
    api.ajax({
      url: api.finance.confirmIncomeStatement(),
      type: 'POST',
      data: formData,
    }, data => {
      if (data.code === 0) {
        message.info('对账单已经双方确认成功！');
        this.hideModal();
        location.reload();
      } else if (data.code === 2302) {
        message.info(data.msg);
        this.hideModal();
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleRealReceiveMoney() {
    const form = this.props.form;
    const cashReceived = form.getFieldDecorator('cash_received').value;
    const posReceived = form.getFieldDecorator('pos_received').value;
    let realReceivedAmount = Number(this.state.statement.online_due);

    if (cashReceived) {
      realReceivedAmount += Number(cashReceived);
    }
    if (posReceived) {
      realReceivedAmount += Number(posReceived);
    }
    return realReceivedAmount;
  }

  render() {
    const { visible, statement } = this.state;
    const { formItemLayout_1014 } = Layout;
    const { getFieldDecorator } = this.props.form;

    return (
      <span>
        <Button
          type="primary"
          className="ml20"
          onClick={this.showModal}
        >
          创建对账单
        </Button>
        <Modal
          title={<span><Icon type="plus" className="mr10" />创建对账单</span>}
          visible={visible}
          width="680px"
          onOk={this.handleSubmit.bind(this)}
          onCancel={this.hideModal}
        >
          <Form>
            {getFieldDecorator('_id', { initialValue: statement._id })(
              <input type="hidden" />,
            )}
            {getFieldDecorator('admin_user_id', { initialValue: statement.admin_user_id })(
              <input type="hidden" />,
            )}

            <Row>
              <Col span={14}>
                <FormItem label="现金收款(元)" {...formItemLayout_1014}>
                  <span>{statement.cash_due}</span>
                </FormItem>
                <FormItem label="银行卡收款(元)" {...formItemLayout_1014}>
                  <span>{statement.card_due}</span>
                </FormItem>
                <FormItem label="微信收款(元)" {...formItemLayout_1014}>
                  <span>{statement.wechat_due}</span>
                </FormItem>
                <FormItem label="支付宝收款(元)" {...formItemLayout_1014}>
                  {statement.alipay_due}
                </FormItem>
                <FormItem label="当日实收款(元)" {...formItemLayout_1014}>
                  <span>{statement.total_due}</span>
                </FormItem>
              </Col>
              <Col span={10} className="center" style={{ marginTop: '50px' }}>
                <span className="canvas no-print">
                  <QRCode
                    value={JSON.stringify({
                      authType: 'confirm-check-sheet-user',
                      requestParams: {
                        type: 'get',
                        url: api.finance.scanQRCodeToVerify(this.state.id, 'admin'),
                        data: {},
                      },
                    })}
                    size={128}
                    ref="qrCode"
                  />
                </span>
                <img src="" className="print-image" ref="printImg" />
                <div>请扫码确认
                  <Icon
                    type="check-circle"
                    className={statement.admin_user_id !== '0' ? 'confirm-check' : 'hide'}
                  />
                </div>
              </Col>
            </Row>
          </Form>
        </Modal>
      </span>
    );
  }
}

FNewIncomingModal = Form.create()(FNewIncomingModal);
export default FNewIncomingModal;
