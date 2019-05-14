import React from 'react';
import { Alert, Button, Checkbox, Col, Icon, Input, Row, Switch, Table, Tooltip, } from 'antd';
import styles from './style';

const CheckboxGroup = Checkbox.Group;
const InputGroup = Input.Group;
require('./index.less');
export default class EditControlRequire extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      max_auto_price: 10000000,
      arrayCreditRecordName: [],
      riskLoanTxt: '',
      riskHouseTxt: '',
      riskBankRecordTxt: '',
      riskResidentPermitTxt: '',
      is_specific_auto_type: false,
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

  componentDidMount() {
    if (Number(this.props.productDetail.max_auto_price) >= 10000000) {
      this.setState({
        isUpLimitValue: true,
      });
    }
    const productDetail = this.props.productDetail;
    if (productDetail) {
      const arrayCreditRecord = productDetail.risk_credit_record.split(',');

      const arrayCreditRecordName = [];
      for (let i = 0; i < arrayCreditRecord.length; i++) {
        if (arrayCreditRecord[i] === '105') {
          arrayCreditRecordName.push('征信白户');
        }
        if (arrayCreditRecord[i] === '104') {
          arrayCreditRecordName.push('信用很差');
        }
        if (arrayCreditRecord[i] === '103') {
          arrayCreditRecordName.push('信用较差');
        }
        if (arrayCreditRecord[i] === '102') {
          arrayCreditRecordName.push('信用良好');
        }
      }
      this.setState({
        arrayCreditRecordName,
        min_auto_price: productDetail.min_auto_price,
        max_auto_price: productDetail.max_auto_price,
        risk_loan: productDetail.risk_loan,
        risk_house: productDetail.risk_house,
        risk_bank_record: productDetail.risk_bank_record,
        risk_credit_record: productDetail.risk_credit_record,
        risk_resident_permit: productDetail.risk_resident_permit,
      });
      if (productDetail.is_specific_auto_type &&
        (productDetail.is_specific_auto_type === '1')) {
        this.setState({
          is_specific_auto_type: true,
        });
      }

      if (productDetail.is_specific_auto_type &&
        (productDetail.is_specific_auto_type === '0')) {
        this.setState({
          is_specific_auto_type: false,
        });
      }

      if (productDetail.risk_bank_record === '1') {
        this.setState({
          riskBankRecordTxt: '无法提供银行流水，',
        });
      }

      if (productDetail.risk_loan === '1') {
        this.setState({
          riskLoanTxt: '无法提供 信用卡／房贷／车贷／银行贷款，',
        });
      }

      if (productDetail.risk_house === '1') {
        this.setState({
          riskHouseTxt: '无法提供 房产证，',
        });
      }

      if (productDetail.risk_resident_permit === '1') {
        this.setState({
          riskResidentPermitTxt: '无法提供 居住证，',
        });
      }

      if (productDetail.risk_credit_record) {
        const arry_risk_credit_record = productDetail.risk_credit_record.split(',');
        const creditRecordTxt = [];
        for (let i = 0; i < arry_risk_credit_record.length; i++) {
          if (arry_risk_credit_record[i] === '105') {
            creditRecordTxt.push('征信白户');
          }

          if (arry_risk_credit_record[i] === '104') {
            creditRecordTxt.push('信用很差');
          }

          if (arry_risk_credit_record[i] === '103') {
            creditRecordTxt.push('信用较差');
          }
          if (arry_risk_credit_record[i] === '102') {
            creditRecordTxt.push('信用良好');
          }
        }
        this.setState({
          creditRecordChange: `征信记录为${  creditRecordTxt.join(',')  }，`,
        });
      }
    }
  }

  handleUpLimit(e) {
    this.setState({
      isUpLimitValue: e.target.checked,
      max_auto_price: 10000000,
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
      arrayCreditRecordName: e,
      creditRecordChange: `征信记录为${  e  },`,
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
            risk_resident_permit: 0,
            riskResidentPermitTxt: '',
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
    let is_specific_auto_type = 0;
    if (this.state.is_specific_auto_type) {
      is_specific_auto_type = 1;
    } else {
      is_specific_auto_type = 0;
    }
    if (this.props.productDetail.type === '1') {
      const data = {
        product_id: this.props.product_id,
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
    if (this.props.productDetail.type === '2') {
      const data = {
        product_id: this.props.product_id,
        min_auto_price: this.state.min_auto_price,
        max_auto_price: this.state.max_auto_price,
        risk_loan: this.state.risk_loan,
        risk_house: this.state.risk_house,
        risk_bank_record: this.state.risk_bank_record,
        risk_credit_record: this.state.risk_credit_record,
        risk_resident_permit: this.state.risk_resident_permit,
        is_specific_auto_type,
      };
      this.props.editRisk(data);
    }
  }

  handleISpecificAutoType(e) {
    this.setState({
      is_specific_auto_type: e,
    });
  }

  render() {
    const { productDetail, isManager } = this.props;

    const {
      risk_loan,
      risk_house,
      risk_bank_record,
      risk_resident_permit,
      arrayCreditRecordName,
      isUpLimitValue,
      checkedTic,
      riskBankRecordTxt,
      riskLoanTxt,
      creditRecordChange,
      riskHouseTxt,
      riskResidentPermitTxt,
    } = this.state;

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
        {record.key == '3'
          ? <span>
              <CheckboxGroup
                disabled={isManager}
                value={arrayCreditRecordName ? arrayCreditRecordName : []}
                options={plainOptions}
                onChange={this.handleCreditRecord}
              />
            </span>
          : <span>
               <Checkbox
                 disabled={isManager}
                 onChange={this.handleCreditRecordNo}
                 checked={String(record.value_id) === '1'}
                 id={record.name}
               >
                 无法提供
               </Checkbox>
            </span>
        }
          </span>
        ),
      }];

    const data = [
      {
        key: '1',
        name: '银行流水',
        value_id: risk_bank_record,
      }, {
        key: '2',
        value_id: risk_loan,
        name: '信用卡／房贷／车贷／银行贷款',
      }, {
        key: '3',
        name: '征信记录',
      }, {
        key: '4',
        name: '房产证',
        value_id: risk_house,
      }, {
        key: '5',
        name: '居住证',
        value_id: risk_resident_permit,
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
                style={styles.inputStyle}
                placeholder="请输入"
                type="number"
                ref="carPricMin"
                addonAfter={'元'}
                disabled={isManager}
                defaultValue={productDetail.min_auto_price}
                onBlur={this.handleCarPriceMin}
              />

              <Input
                style={styles.inputMidLIne}
                placeholder="-"
                disabled
              />

              <Input
                style={styles.inputStyle}
                disabled={isManager ? true : isUpLimitValue}
                placeholder="请输入"
                type="number"
                addonAfter={'元'}
                defaultValue={Number(productDetail.min_auto_price) >= 10000000
                  ? ''
                  : productDetail.max_auto_price}
                ref="carPricMax"
                onBlur={this.handleCarPriceMax}
              />

              <Checkbox
                style={styles.checkBoxLimit}
                disabled={isManager}
                defaultChecked={Number(productDetail.max_auto_price) >= 10000000}
                onChange={this.handleUpLimit}
              >
                上限不限
              </Checkbox>
            </InputGroup>

          </Col>
        </Row>
        {this.props.productDetail.type == 2 &&
        <Row className="mb40">
          <Col>
            <Tooltip title="若该产品仅针对部分固定的车型，则需要指定车型。">
              <Icon type="question-circle-o" />
            </Tooltip>
            <label>指定车型：</label>
            <Switch
              checkedChildren="有"
              unCheckedChildren="无"
              defaultChecked={this.props.productDetail.is_specific_auto_type != '0'}
              onChange={this.handleISpecificAutoType}
            />
          </Col>
        </Row>}

        <Row className="head-action-bar-line mb20">
          <h4>资质风控</h4>
        </Row>
        <Row className='top12'>
          <Alert message="资质风控部分请设置该产品不允许的风控条件。" type="info" showIcon />
        </Row>

        <Row className='mt20 mb30'>
          <Col span={24}>
            <label>说明: </label>
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

        <Table columns={columns} pagination={false} dataSource={data} />
        <Row type="flex" justify="center" className='mt20'>
          <Button
            type="primary"
            disabled={isManager}
            onClick={this.handleRiskControl}
          >
            保存
          </Button>
        </Row>

      </div>

    );
  }
}
