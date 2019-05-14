import React from 'react';
import { Button, Col, Form, Input, Modal, Row } from 'antd';

import Layout from '../../../utils/FormLayout';

const FormItem = Form.Item;

class AddResource extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    [
      'handleShow',
      'handleCancel',
      'handleSubmit',
      'handleCancelChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleShow() {
    this.setState({
      visible: true,
    });
  }

  handleCancel() {
    this.setState({ visible: false });
    this.props.form.setFieldsValue({ name: '' });
    this.props.form.setFieldsValue({ contact: '' });
    this.props.form.setFieldsValue({ telphone: '' });
  }

  handleCancelChange() {
    this.setState({ visible: false });
    this.props.form.setFieldsValue({ name: '' });
    this.props.form.setFieldsValue({ contact: '' });
    this.props.form.setFieldsValue({ telphone: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createResource(values);
        this.props.getResourceList(0, -1);
        this.setState({ visible: false });
      }
    });
  }

  render() {
    const { formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button type="primary" onClick={this.handleShow}>
          新增资源方
        </Button>
        <Modal
          title="新增资源方"
          visible={this.state.visible}
          footer={[
            <Button key="back" onClick={this.handleCancel}>取消</Button>,
            <Button
              key="2"
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >确定</Button>,
          ]}
          onCancel={this.handleCancelChange}
        >
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                <FormItem label="资源方名称" {...formItemLayout}>
                  {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请填写资源方名称', whitespace: true }],
                  })(
                    <Input placeholder="请输入资源方名称" />,
                  )}
                </FormItem>

                <FormItem label="联系人"{...formItemLayout}>
                  {getFieldDecorator('contact', {
                    rules: [{ required: false, message: '请填写联系人', whitespace: true }],
                  })(
                    <Input placeholder="请输入联系人" />,
                  )}
                </FormItem>

                <FormItem label="电话"{...formItemLayout}>
                  {getFieldDecorator('telphone', {
                    rules: [{ required: false, message: '请输入电话', whitespace: true }],
                  })(
                    <Input type="number" placeholder="请输入电话" />,
                  )}
                </FormItem>
              </Col>
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}

AddResource = Form.create()(AddResource);
export default AddResource;
