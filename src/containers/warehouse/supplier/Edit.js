import React from 'react';
import { Col, Form, Icon, Input, message, Modal, Row } from 'antd';

import BaseModal from '../../../components/base/BaseModal';

import api from '../../../middleware/api';
import validator from '../../../utils/validator';
import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';

const FormItem = Form.Item;

class Edit extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  closeModal() {
    this.hideModal();
    this.props.form.resetFields();
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error(validator.text.hasError);
        return;
      }

      api.ajax({
        url: api.warehouse.supplier.edit(),
        type: 'POST',
        data: values,
      }, () => {
        message.success('修改成功！');
        this.hideModal();
        this.props.form.resetFields();
        this.props.onSuccess();
      });
    });
  }

  render() {
    const { visible } = this.state;
    const { formItemLayout } = Layout;
    const { supplier, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <span>
        <a href="javascript:" onClick={this.showModal}>编辑</a>

        <Modal
          title={<span><Icon type="edit" /> 编辑供应商</span>}
          visible={visible}
          onCancel={this.closeModal}
          onOk={this.handleSubmit}
        >
          <Form>
            {getFieldDecorator('_id', { initialValue: supplier._id })(
              <Input type="hidden" />,
            )}

            <Row>
              <Col span={18} offset={6}>
                <h6 className="form-module-title">供应商信息</h6>
              </Col>
            </Row>

            <FormItem label="单位名称" {...formItemLayout}>
              {getFieldDecorator('supplier_company', {
                initialValue: supplier.supplier_company,
                rules: FormValidator.getRuleNotNull(),
                validateTrigger: 'onBlur',
              })(
                <Input placeholder="请输入单位名称" />,
              )}
            </FormItem>

            <FormItem label="主营业务" {...formItemLayout}>
              {getFieldDecorator('main_business', {
                initialValue: supplier.main_business,
              })(
                <Input placeholder="请输入主营业务" />,
              )}
            </FormItem>

            <FormItem label="联系人" {...formItemLayout}>
              {getFieldDecorator('user_name', {
                initialValue: supplier.user_name,
                rules: FormValidator.getRuleNotNull(),
                validateTrigger: 'onBlur',
              })(
                <Input placeholder="请输入联系人" />,
              )}
            </FormItem>

            <FormItem label="电话号码" {...formItemLayout}>
              {getFieldDecorator('phone', {
                initialValue: supplier.phone,
                rules: FormValidator.getRuleNotNull(),
                validateTrigger: 'onBlur',
              })(
                <Input placeholder="请输入电话号码" />,
              )}
            </FormItem>

            <FormItem label="单位地址" {...formItemLayout}>
              {getFieldDecorator('address', { initialValue: supplier.address })(
                <Input placeholder="请输入单位地址" />,
              )}
            </FormItem>

            <Row>
              <Col span={18} offset={6}>
                <h6 className="form-module-title">付款信息</h6>
              </Col>
            </Row>

            <FormItem label="单位税号" {...formItemLayout}>
              {getFieldDecorator('tax', { initialValue: supplier.tax })(
                <Input placeholder="请输入单位税号" />,
              )}
            </FormItem>

            <FormItem label="开户行" {...formItemLayout}>
              {getFieldDecorator('bank', { initialValue: supplier.bank })(
                <Input placeholder="请输入开户行" />,
              )}
            </FormItem>

            <FormItem label="银行账号" {...formItemLayout}>
              {getFieldDecorator('bank_account', { initialValue: supplier.bank_account })(
                <Input placeholder="请输入银行账号" />,
              )}
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

Edit = Form.create()(Edit);
export default Edit;
