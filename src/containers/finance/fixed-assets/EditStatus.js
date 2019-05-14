import React from 'react';
import { Button, Form, Icon, Input, message, Modal, Select } from 'antd';
import BaseModal from '../../../components/base/BaseModal';

import validator from '../../../utils/validator';
import FormLayout from '../../../utils/FormLayout';
import FormValidator from '../../../utils/FormValidator';

import api from '../../../middleware/api';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const TextArea = Input.TextArea;

class EditStatus extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    [
      'handleSubmit',
      'saveChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error(validator.text.hasError);
        return;
      }

      const self = this;

      if (values.type === '7') {
        confirm({
          title: '你确定要报废该资产吗？',
          content: '报废不可恢复！',
          onOk() {
            self.saveChange(values);
          },
          onCancel() {
          },
        });
      } else {
        self.saveChange(values);
      }
    });
  }

  saveChange(params) {
    api.ajax({
      url: api.finance.fixedAssets.editStatus(),
      type: 'POST',
      data: params,
    }, () => {
      message.success('修改成功');
      this.hideModal();
      this.props.form.resetFields();
      this.props.onSuccess();
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible } = this.state;
    const { formItemLayout, selectStyle } = FormLayout;
    const { size } = this.props;
    return (
      <span>
        {
          size === 'small'
            ? <a href="javascript:;" onClick={this.showModal}>修改状态</a>
            : <Button onClick={this.showModal}>修改状态</Button>
        }

        <Modal
          title={<span><Icon type="edit" className="mr10" />修改状态</span>}
          visible={visible}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >

          <Form>
            {getFieldDecorator('fixed_assets_id', { initialValue: this.props._id })}

            <FormItem label="修改状态" {...formItemLayout}>
              {getFieldDecorator('type', {
                rules: FormValidator.getRuleNotNull(),
                validateTrigger: 'onBlur',
              })(
                <Select {...selectStyle} placeholder="请选择状态">
                  <Option key="1">维修</Option>
                  <Option key="2">维修完毕</Option>
                  <Option key="3">出借</Option>
                  <Option key="4">归还</Option>
                  <Option key="5">丢失</Option>
                  <Option key="6">找回</Option>
                  <Option key="7">报废</Option>
                </Select>,
              )}
            </FormItem>

            <FormItem label="修改数量" {...formItemLayout}>
              {getFieldDecorator('count', {
                rules: FormValidator.getRuleNotNull(),
                validateTrigger: 'onBlur',
              })(
                <Input type="number" placeholder="请输入修改数量" />,
              )}
            </FormItem>

            <FormItem label="描述" {...formItemLayout}>
              {getFieldDecorator('remark')(
                <TextArea placeholder="请输入描述" />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

EditStatus = Form.create()(EditStatus);
export default EditStatus;
