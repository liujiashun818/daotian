import React from 'react';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';
import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';
import styles from './style';

const FormItem = Form.Item;

require('./index.less');

const Option = Select.Option;

class AddFinancial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service_fee_config: '',
      finance_length_type12: '',
      finance_length_type24: '',
      finance_length_type36: '',
      finance_length_type48: '',
      finance_length_type60: '',
      finance_length_type72: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeFinanceConfig(record, e) {
    switch (String(record.key)) {
      case '1':
        this.setState({ finance_length_type12: e.target.value });
        break;
      case '2':
        this.setState({ finance_length_type24: e.target.value });
        break;
      case '3':
        this.setState({ finance_length_type36: e.target.value });
        break;
      case '4':
        this.setState({ finance_length_type48: e.target.value });
        break;
      case '5':
        this.setState({ finance_length_type60: e.target.value });
        break;
      case '6':
        this.setState({ finance_length_type72: e.target.value });
        break;
      default:
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const service_fee_config_str = [
          { begain: 0, end: 100000, fee: this.state.finance_length_type12 },
          { begain: 100000, end: 200000, fee: this.state.finance_length_type24 },
          { begain: 200000, end: 300000, fee: this.state.finance_length_type36 },
          { begain: 300000, end: 400000, fee: this.state.finance_length_type48 },
          { begain: 400000, end: 500000, fee: this.state.finance_length_type60 },
          { begain: 500000, end: 10000000, fee: this.state.finance_length_type72 },
        ];
        const service_fee_config = JSON.stringify(service_fee_config_str);
        const product_id = this.props.createProductResponse.detail._id;
        const data = {
          product_id,
          calculate_type: values.calculate_type,
          pickup_fee: values.pickup_fee,
          finance_length_types: values.finance_length_types.join(','),
          service_fee_config,
        };
        this.props.editLoanFinance(data);
      }
    });
  }

  render() {
    const { formItemLayoutHalf,formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    const self = this;

    const columns = [
      {
        title: '开票价',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '服务费（元）',
        key: 'action',
        render: (text, record) => (
          <Input
            addonAfter={'元'}
            placeholder="请输入"
            type="number"
            onChange={self.handleChangeFinanceConfig.bind(self, record)}
          />
        ),
      }];

    const data = [
      {
        key: 1,
        name: '0-10W（含）',

      }, {
        key: 2,
        name: '10-20W（含）',
      }, {
        key: 3,
        name: '20-30W（含）',
      }, {
        key: 4,
        name: '30-40W（含）',
      }, {
        key: 5,
        name: '40-50W（含）',
      }, {
        key: 6,
        name: '50W以上',
      }];

    return (
      <div className="finBingPro padding-top-20">
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                label="计算器"
                {...formItemLayoutHalf}
              >
                {getFieldDecorator('calculate_type', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                })(
                  <Select placeholder="请选择" style={styles.width360}>
                    <Option value="1">易鑫优质客户</Option>
                    <Option value="2">易鑫保证金客户</Option>
                    <Option value="3">金磁客户</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem
                {...formItemLayoutHalf}
                label="融资期限"
              >
                {getFieldDecorator('finance_length_types', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                })(
                  <Select placeholder="请选择" mode="multiple" style={styles.width360}>
                    <Option value="12">12期</Option>
                    <Option value="24">24期</Option>
                    <Option value="36">36期</Option>
                    <Option value="48">48期</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem
                label="服务费"
                {...formItemLayoutHalf}
              >
                {getFieldDecorator('service_fee_config')(
                  <Table
                    style={styles.width360}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    bordered
                  />,
                )}
              </FormItem>

              <Row type="flex" justify="center" className='mt40'>
                <FormItem {...formItemLayout}>
                    <Button type="primary" htmlType="submit">保存</Button>
                  </FormItem>
              </Row>
            </Form>
      </div>
    );
  }
}

AddFinancial = Form.create()(AddFinancial);
export default AddFinancial;
