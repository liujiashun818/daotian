import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';

import validator from '../../../utils/validator';

import BaseModal from '../../../components/base/BaseModal';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class NotPass extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };

    [
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error('填写的表单内容有误,请检查必填信息或数据格式');
        return false;
      }

      this.props.handleAuditExamine({ type: 0, reason: values.reason });
      this.props.form.resetFields();
      this.hideModal();
      // location.reload();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;

    const footer = [
      <Button key="btn1" type="ghost" onClick={this.handleSubmit}>提交</Button>,
      <Button key="btn2" type="primary" onClick={this.hideModal}>取消</Button>,
    ];
    return (
      <span>
        <Button
          onClick={this.showModal}
          disabled={String(this.props.status) !== '3'}
        >
          不通过
        </Button>

        <Modal
          visible={visible}
          title="驳回原因"
          onCancel={this.hideModal}
          footer={footer}
          width="720px"
        >
          <FormItem label="备注" labelCol={{ span: 2 }} wrapperCol={{ span: 20 }}>
            {getFieldDecorator('reason', {
              initialValue: '',
              rules: [
                {
                  required: true,
                  message: validator.required.notNull,
                }],
            })(
              <TextArea rows={4} placeholder="请输入驳回原因" />,
            )}
          </FormItem>
        </Modal>
      </span>
    );
  }
}

NotPass = Form.create()(NotPass);
export default NotPass;
