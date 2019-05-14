import React from 'react';
import { Alert, Button, Checkbox, Col, Icon, Input, Row, Switch, Table, Tooltip } from 'antd';
import styles from './style';

const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;

require('./index.less');
export default class AddControlRequire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: null,
      isUpLimitValue: false,
      creditRecordChange: '',
      checkedTic: '',
      carPriceMinValue: '请输入',
      risk_loan: 0,
      risk_house: 0,
      risk_bank_record: 0,
      risk_credit_record: '',
      risk_resident_permit: 0,
      min_auto_price: 0,
      max_auto_price: 100000000,
      riskLoanTxt: '',
      riskHouseTxt: '',
      riskBankRecordTxt: '',
      riskResidentPermitTxt: '',
      isSpecificAutoType: false,
    };

    [
      'handleUpLimit',
      'handleCreditRecord',
      'handleCreditRecordNo',
      'handleCarPriceMin',
      'handleCarPriceMax',
      'handleRiskControl',
      'handleISpecificAutoType',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const plainOptions = ['征信白户', '信用很差', '信用较差', '信用良好'];
    const columns = [
      {
        title: '要求名称',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="#">{text}</a>,
      }, {
        title: '风控条件',
        key: 'action',
        render: (text, record) => (
          <span>
        {record.key === '3'
          ? <CheckboxGroup options={plainOptions} onChange={this.handleCreditRecord} />
          : <span>
             <Checkbox
               onChange={this.handleCreditRecordNo}
               className="checkboxCopy"
               id={record.name}
             >
               无法提供
             </Checkbox>
            </span>
        }
          </span>
        ),
      }];
    this.setState({
      columns,
    });
  }

  handleUpLimit(e) {
    this.setState({
      isUpLimitValue: e.target.checked,
      max_auto_price: 100000000,
    });
  }

  handleCreditRecord(e) {
    const risk_credit_record_str = [];
    for (let i = 0; i < e.length; i++) {
      if (e[i] === '征信白户') {
        risk_credit_record_str.push('105');
      }
      if (e[i] === '信用很差') {
        risk_credit_record_str.push('104');
      }
      if (e[i] === '信用较差') {
        risk_credit_record_str.push('103');
      }
      if (e[i] === '信用良好') {
        risk_credit_record_str.push('102');
      }
    }
    const risk_credit_record = risk_credit_record_str.join(',');
    this.setState({
      creditRecordChange: `征信记录为${  e  }，`,
      risk_credit_record,
    });
    if (e.length === 0) {
      this.setState({ creditRecordChange: '' });
    }
  }

  handleCreditRecordNo(e) {
    if (e.target.checked) {
      switch (e.target.id) {
        case '银行流水':
          this.setState({
            risk_bank_record: 1,
            riskBankRecordTxt: '无法提供银行流水，',
          });
          break;
        case '信用卡／房贷／车贷／银行贷款':
          this.setState({
            risk_loan: 1,
            riskLoanTxt: '无法提供 信用卡／房贷／车贷／银行贷款，',
          });
          break;
        case '房产证':
          this.setState({
            risk_house: 1,
            riskHouseTxt: '无法提供 房产证，',
          });
          break;
        case '居住证':
          this.setState({
            risk_resident_permit: 1,
            riskResidentPermitTxt: '无法提供 居住证，',
          });
          break;
        default:
      }
    }
    if (!e.target.checked) {
      switch (e.target.id) {
        case '银行流水':
          this.setState({
            risk_bank_record: 0,
            riskBankRecordTxt: '',
          });
          break;
        case '信用卡／房贷／车贷／银行贷款':
          this.setState({
            risk_loan: 0,
            riskLoanTxt: '',
          });
          break;
        case '房产证':
          this.setState({
            riskHouseTxt: '',
            risk_house: 0,
          });
          break;
        case '居住证':
          this.setState({
            riskResidentPermitTxt: '',
            risk_resident_permit: 0,
          });
          break;
        default:
      }
    }
  }

  handleCarPriceMin(e) {
    this.setState({
      min_auto_price: this.refs.carPricMin.refs.input.value,
    });
  }

  handleCarPriceMax(e) {
    this.setState({
      max_auto_price: this.refs.carPricMax.refs.input.value,
    });
  }

  handleRiskControl() {
    const product_id = this.props.createProductResponse.detail._id;
    let isSpecificAutoType = 0;
    if (this.state.isSpecificAutoType) {
      isSpecificAutoType = 1;
    } else {
      isSpecificAutoType = 0;
    }
    if (this.props.type === '1') {
      const data = {
        product_id,
        min_auto_price: this.state.min_auto_price,
        max_auto_price: this.state.max_auto_price,
        risk_loan: this.state.risk_loan,
        risk_house: this.state.risk_house,
        risk_bank_record: this.state.risk_bank_record,
        risk_credit_record: this.state.risk_credit_record,
        risk_resident_permit: this.state.risk_resident_permit,
      };
      this.props.editRisk(data);
    }
    if (this.props.type === '2') {
      const data = {
        product_id,
        min_auto_price: this.state.min_auto_price,
        max_auto_price: this.state.max_auto_price,
        risk_loan: this.state.risk_loan,
        risk_house: this.state.risk_house,
        risk_bank_record: this.state.risk_bank_record,
        risk_credit_record: this.state.risk_credit_record,
        risk_resident_permit: this.state.risk_resident_permit,
        is_specific_auto_type: isSpecificAutoType,
      };
      this.props.editRisk(data);
    }
  }

  handleISpecificAutoType(e) {
    this.setState({
      isSpecificAutoType: e,
    });
  }

  render() {
    const {
      isUpLimitValue,
      isSpecificAutoType,
      checkedTic,
      riskBankRecordTxt,
      riskLoanTxt,
      creditRecordChange,
      riskHouseTxt,
      riskResidentPermitTxt,
      columns,
    } = this.state;

    const data = [
      {
        key: '1',
        name: '银行流水',
      }, {
        key: '2',
        name: '信用卡／房贷／车贷／银行贷款',
      }, {
        key: '3',
        name: '征信记录',
      }, {
        key: '4',
        name: '房产证',
      }, {
        key: '5',
        name: '居住证',
      }];

    return (
      <div className="hqRisk">
        <Row className="head-action-bar-line mb20">
          <h4>车辆风控</h4>
        </Row>

        <Row className="mb20">
          <Col>
            <InputGroup>
              <label style={styles.labelStyle}>车价范围：</label>
              <Input
                addonAfter={'元'}
                placeholder="请输入"
                style={styles.inputStyle}
                type="number"
                ref="carPricMin"
                min='0'
                onBlur={this.handleCarPriceMin}
              />
              <Input
                style={styles.inputMidLIne}
                placeholder="-"
                disabled
              />
              <Input
                style={styles.inputStyle}
                type="number"
                min='0'
                ref="carPricMax"
                addonAfter={'元'}
                placeholder="请输入"
                disabled={isUpLimitValue}
                onBlur={this.handleCarPriceMax}
              />
              <Checkbox
                onChange={this.handleUpLimit}
                style={styles.checkBoxLimit}
              >
                上限不限
              </Checkbox>
            </InputGroup>

          </Col>
        </Row>

        {this.props.type === '2' && (
          <Row className="mb40">
            <Col>
              <Tooltip title="若该产品仅针对部分固定的车型，则需要指定车型。">
                <Icon type="question-circle-o" />
              </Tooltip>
              <label>指定车型：</label>
              <Switch
                checkedChildren="有"
                unCheckedChildren="无"
                defaultChecked={isSpecificAutoType}
                onChange={this.handleISpecificAutoType}
              />
            </Col>
          </Row>
        )}
        <Row className="head-action-bar-line mb20">
          <h4>资质风控</h4>
        </Row>

        <Row className='top12'>
          <Alert message="资质风控部分请设置该产品不允许的风控条件。" type="info" showIcon />
        </Row>

        <Row className='mb30 mt20'>
          <Col span={24}>
            <label>说明：</label>
            <span>若客户&nbsp;</span>
            <span className='borderBottom'>
              {checkedTic}
              {riskBankRecordTxt}
              {riskLoanTxt}
              {creditRecordChange}
              {riskHouseTxt}
              {riskResidentPermitTxt}
               </span>
            <span>&nbsp;则无法进行该方案</span>
          </Col>
        </Row>

        <Table
          columns={columns}
          pagination={false}
          dataSource={data}
        />

        <Row type="flex" justify="center" className='mt20'>
            <Button type="primary" onClick={this.handleRiskControl}>保存</Button>
        </Row>
      </div>
    );
  }
}
