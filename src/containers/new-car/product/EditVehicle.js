import React from 'react';
import { Alert, Button, Col, Form, Row, Select, Switch, } from 'antd';

import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';
import styles from './style';

const FormItem = Form.Item;
const Option = Select.Option;

class EditVehicle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      can_buy_salvage_value: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let can_buy_salvage_value = 0;
        if (values.can_buy_salvage_value) {
          can_buy_salvage_value = 1;
        } else {
          can_buy_salvage_value = 0;
        }
        const data = {
          product_id: this.props.product_id,
          rent_length_type: values.rent_length_type,
          finance_length_types: values.finance_length_types.join(','),
          can_buy_salvage_value: can_buy_salvage_value,
        };
        this.props.amountFixFinance(data);
      }
    });
  }

  render() {
    const { productDetail, isManager } = this.props;
    const { formItemLayoutHalf, formItemLayout_0024 } = Layout;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <Row className='top12 mt20'>
          <Alert
            message="固定首尾付类型中，首付，尾付，保证金及服务费金额固定，在车型方案中设置。"
            type="info"
            showIcon
          />
        </Row>
        <Row className='mt42'>
          <Col>
            <Form onSubmit={this.handleSubmit}>
              <FormItem label="租期" {...formItemLayoutHalf} >
                {getFieldDecorator('rent_length_type', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                  initialValue: productDetail.rent_length_type,
                })(
                  <Select
                    placeholder="请选择"
                    style={styles.width360}
                    disabled={isManager}
                  >
                    <Option value="12">12期</Option>
                    <Option value="24">24期</Option>
                    <Option value="36">36期</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem label="融资期限" {...formItemLayoutHalf} >
                {getFieldDecorator('finance_length_types', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                  initialValue: (productDetail.finance_length_types &&
                    productDetail.finance_length_types.split(',')) || [],
                })(
                  <Select
                    placeholder="请选择"
                    style={styles.width360}
                    mode="multiple"
                    disabled={isManager}
                  >
                    <Option value="12">12期</Option>
                    <Option value="24">24期</Option>
                    <Option value="36">36期</Option>
                    <Option value="48">48期</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem label="是否可以残值买断" {...formItemLayoutHalf} >
                {getFieldDecorator('can_buy_salvage_value', {
                  initialValue: productDetail.can_buy_salvage_value != '0',
                })(
                  <Switch
                    disabled={isManager}
                    defaultChecked={productDetail.can_buy_salvage_value != '0'}
                    checkedChildren="是"
                    unCheckedChildren="否"
                  />,
                )}
              </FormItem>

              <Row type="flex" justify="center" className='mt40'>
                <FormItem {...formItemLayout_0024}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={isManager}
                  >
                    保存
                  </Button>
                </FormItem>
              </Row>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

EditVehicle = Form.create()(EditVehicle);
export default EditVehicle;
