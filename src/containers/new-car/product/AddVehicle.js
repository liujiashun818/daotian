import React from 'react';
import { Alert, Button, Col, Form, Row, Select, Switch, } from 'antd';

import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';

import styles from './style';

const FormItem = Form.Item;
const Option = Select.Option;

class AddVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      can_buy_salvage_value: 0,
    };
    [
      'handleCanBuySalvageValue',
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleCanBuySalvageValue(value) {
    if (value) {
      this.setState({
        can_buy_salvage_value: 1,
      });
    }
    if (!value) {
      this.setState({
        can_buy_salvage_value: 0,
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const product_id = this.props.createProductResponse.detail._id;
        const data = {
          product_id,
          rent_length_type: values.rent_length_type,
          finance_length_types: values.finance_length_types.join(','),
          can_buy_salvage_value: this.state.can_buy_salvage_value,
        };
        this.props.amountFixFinance(data);
      }
    });
  }

  render() {
    const { formItemLayoutHalf, formItemLayout_0024 } = Layout;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row className='mb20 top12'>
          <Alert
            message="固定首尾付类型中，首付，尾付，保证金及服务费金额固定，在车型方案中设置。"
            type="info"
            showIcon
          />
        </Row>

        <Row>
          <Col>
            <Form onSubmit={this.handleSubmit}>

              <FormItem label="租期"{...formItemLayoutHalf}>
                {getFieldDecorator('rent_length_type', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                })(
                  <Select placeholder="请选择" style={styles.width360}>
                    <Option value="12">12期</Option>
                    <Option value="24">24期</Option>
                    <Option value="36">36期</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem label="融资期限" {...formItemLayoutHalf}>
                {getFieldDecorator('finance_length_types', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                })(
                  <Select
                    mode="multiple"
                    placeholder="请选择"
                    style={styles.width360}
                  >
                    <Option value="12">12期</Option>
                    <Option value="24">24期</Option>
                    <Option value="36">36期</Option>
                    <Option value="48">48期</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem label="是否可以残值买断" {...formItemLayoutHalf}>
                {getFieldDecorator('can_buy_salvage_value')(
                  <Switch
                    checkedChildren="是"
                    unCheckedChildren="否"
                    onChange={this.handleCanBuySalvageValue}
                  />)}
              </FormItem>

              <Row type="flex" justify="center" className='mt40'>
                <FormItem {...formItemLayout_0024}>
                  <Button type="primary" htmlType="submit">保存</Button>
                </FormItem>
              </Row>
            </Form>

          </Col>
        </Row>
      </div>
    );
  }
}

AddVehicle = Form.create()(AddVehicle);
export default AddVehicle;

