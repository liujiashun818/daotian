import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Col, Form, Input, message, Row, Table } from 'antd';

import api from '../../../middleware/api';
import Layout from '../../../utils/FormLayout';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

class Reject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showData: [],
    };

    [
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const { startTime } = this.props;
    this.getRejectPart(startTime);
  }

  componentWillReceiveProps(nextProps) {
    if (String(nextProps.startTime) !== String(this.props.startTime)) {
      this.getRejectPart(nextProps.startTime);
    }
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error('输入信息有误，请核实后提交');
        return false;
      }

      const { detail, list } = this.state;
      const { startTime } = this.props;
      const showData = detail.length === 0 ? list : detail;

      const submitData = showData.map((item, index) => {
        item.remark = values[`remark${index}`];
        return item;
      });

      const data = {
        start_date: startTime,
        reject_item_list: JSON.stringify(submitData),
      };

      api.ajax({
        url: api.aftersales.weekly.saveRejectPart(),
        type: 'POST',
        data,
      }, () => {
        message.success('退货情况保存成功');
      });
    });
  }

  getRejectPartDetail(startTime) {
    return new Promise(resolve => {
      api.ajax({ url: api.aftersales.weekly.rejectPartDetail(startTime) }, data => {
          let detail = [];
          try {
            detail = !!data.res.list ? JSON.parse(data.res.list) : [];
          } catch (e) {
            detail = !!(data.res.list) ? data.res.list : [];
          }
          resolve(detail);
        },
      );
    });
  }

  getWeekRejectPartList(startTime) {
    return new Promise(resolve => {
      api.ajax({ url: api.aftersales.weekly.weekRejectPartList(startTime) }, data => {
          resolve(data.res.list);
        },
      );
    });
  }

  async getRejectPart(startTime) {
    const detail = await this.getRejectPartDetail(startTime);
    const list = await this.getWeekRejectPartList(startTime);
    this.getShowData(detail, list);
  }

  getShowData(detail, list) {
    const showData = JSON.parse(JSON.stringify(detail));
    list.map(listItem => {
      let bool = false;
      detail.map(detailItem => {
        if (listItem._id === detailItem._id) {
          bool = true;
        }
      });
      if (!bool) {
        showData.push(listItem);
      }
    });

    this.setState({ showData });
  }

  render() {
    const { showData } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { formItemThree, formItemLg } = Layout;

    const columns = [
      {
        title: '配件名',
        dataIndex: 'auto_part_info',
        key: 'part_name',
        render: value => !!value && value.name,
      }, {
        title: '配件号',
        dataIndex: 'auto_part_info',
        key: 'part_no',
        render: value => !!value && value.part_no,
      }, {
        title: '退货数',
        dataIndex: 'amount',
        key: 'amount',
      }, {
        title: '退款差价',
        dataIndex: 'amount',
        key: 'diff_price',
        render: (value, record) => {
          const purchasePrice = Number(value) * Number(record.purchase_price);
          const rejectPrice = Number(value) * Number(record.reject_price);

          return (purchasePrice - rejectPrice).toFixed(2);
        },
      }];

    const content = (
      showData.map((item, index) => (
        <div key={index}>
          <Row className="mt20">
            <Col span={9}>
              <FormItem label="退货单号" {...formItemThree}>
                <Link
                  to={{ pathname: `/warehouse/purchase-reject/detail/${item.reject_id}` }}
                  target="_blank"
                >
                  {item.reject_id}
                </Link>
              </FormItem>
            </Col>
            <Col span={4}>
              <label className="label">供应商</label>
              <span>{item.supplier_info && item.supplier_info.supplier_company}</span>
            </Col>
          </Row>

          <Row className="mt20">
            <Col span={18}>
              <FormItem label="配件" {...formItemLg}>
                <Table
                  columns={columns}
                  dataSource={[item]}
                  pagination={false}
                  size="middle"
                  rowKey={() => index}
                />
              </FormItem>
            </Col>
          </Row>

          <Row>
            <Col span={18}>
              <FormItem label="情况说明" {...formItemLg}>
                {getFieldDecorator(`remark${index}`, {
                  initialValue: item.remark,
                })(
                  <TextArea rows={1} placeholder="请输入因何原因退货，如有差价，说明原因" />,
                )}
              </FormItem>
            </Col>
          </Row>

          <div className="with-bottom-border mlr-20" />
        </div>
      ))
    );
    return (
      <Form>
        <div className={showData.length > 0 ? '' : 'hide'}>
          {content}
          <Row className="mt20 mb20">
            <Col span={8} offset={3}>
              <Button type="primary" onClick={this.handleSubmit}>提交</Button>
            </Col>
          </Row>
        </div>

        <div className={showData.length > 0 ? 'hide' : 'mt20'}>
          <Alert message="本周没有相关异常" type="success" className="width-250" />
        </div>

      </Form>
    );
  }
}

Reject = Form.create()(Reject);
export default Reject;
