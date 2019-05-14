import React from 'react';
import { Button, Col, Form, Input, Row, Select, Table } from 'antd';

import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';
import styles from './style';

const FormItem = Form.Item;
const Option = Select.Option;

class EditFinancial extends React.Component {
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

  componentDidMount() {
    const productDetail = this.props.productDetail;
    const service_fee_config = JSON.parse(productDetail.service_fee_config);
    if (service_fee_config.length > 0) {
      this.setState({
        finance_length_type12: service_fee_config[0].fee,
        finance_length_type24: service_fee_config[1].fee,
        finance_length_type36: service_fee_config[2].fee,
        finance_length_type48: service_fee_config[3].fee,
        finance_length_type60: service_fee_config[4].fee,
        finance_length_type72: service_fee_config[5].fee,
      });
    }
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
        const str_finance_length = [
          { begain: 0, end: 100000, fee: this.state.finance_length_type12 },
          { begain: 100000, end: 200000, fee: this.state.finance_length_type24 },
          { begain: 200000, end: 300000, fee: this.state.finance_length_type36 },
          { begain: 300000, end: 400000, fee: this.state.finance_length_type48 },
          { begain: 400000, end: 500000, fee: this.state.finance_length_type60 },
          { begain: 500000, end: 10000000, fee: this.state.finance_length_type72 },
        ];
        const service_fee_config = JSON.stringify(str_finance_length);
        const data = {
          product_id: this.props.product_id,
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
    const { productDetail, isManager } = this.props;
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
          <span>
             <Input
               type="number"
               value={record.fee_Value}
               onChange={self.handleChangeFinanceConfig.bind(self, record)}
               addonAfter={'元'}
             />
          </span>
        ),
      }];

    const dataSource = [
      {
        key: 1,
        name: '0-10W（含）',
        fee_Value: this.state.finance_length_type12,
      }, {
        key: 2,
        name: '10-20W（含）',
        fee_Value: this.state.finance_length_type24,
      }, {
        key: 3,
        name: '20-30W（含）',
        fee_Value: this.state.finance_length_type36,
      }, {
        key: 4,
        name: '30-40W（含）',
        fee_Value: this.state.finance_length_type48,
      }, {
        key: 5,
        name: '40-50W（含）',
        fee_Value: this.state.finance_length_type60,
      }, {
        key: 6,
        name: '50W以上',
        fee_Value: this.state.finance_length_type72,
      }];

    return (
      <div className="finBingPro padding-top-20">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="计算器" {...formItemLayoutHalf}>
            {getFieldDecorator('calculate_type', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
              initialValue: productDetail.calculate_type,
            })(
              <Select placeholder="请选择" disabled={isManager} style={styles.width360}>
                <Option value="0">请选择</Option>
                <Option value="1">易鑫优质客户</Option>
                <Option value="2">易鑫保证金客户</Option>
                <Option value="3">金磁客户</Option>
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
                mode="multiple"
                style={styles.width360}
                placeholder="请选择"
                disabled={isManager}
              >
                <Option value="">请选择</Option>
                <Option value="12">12期</Option>
                <Option value="24">24期</Option>
                <Option value="36">36期</Option>
                <Option value="48">48期</Option>
              </Select>,
            )}
          </FormItem>

          <FormItem label="服务费" {...formItemLayoutHalf}>
            {getFieldDecorator('service_fee_config')(
              <Table
                style={styles.width360}
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                bordered
              />,
            )}
          </FormItem>

          <Row type="flex" justify="center" className='mt40'>
              <FormItem {...formItemLayout}>
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
      </div>
    );
  }
}

EditFinancial = Form.create()(EditFinancial);
export default EditFinancial;
