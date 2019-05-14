import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Button, Cascader, Col, DatePicker, Form, Input, message, Modal, Row } from 'antd';

import Layout from '../../../utils/FormLayout';
import formatter from '../../../utils/DateFormatter';
import BaseModalWithUpload from '../../../components/base/BaseModalWithUpload';
import FormValidator from '../../../utils/FormValidator';

import { getProvinces, getRegin } from '../../../reducers/new-car/product/productActions';
import {
  createStatistic,
  editStatistic,
  getStatisticList,
  setCity,
} from '../../../reducers/new-car/statistic/statisticActions';

const FormItem = Form.Item;

class Add extends BaseModalWithUpload {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      isEdit: false,
      isAdd: false,
      cityId: '',
      date: '',
      detail: props.detail || {},
    };

    [
      'getRegion',
      'showModal',
      'hideModal',
      'handleEditShow',
      'handleAddShow',
      'handleRegionChange',
      'handleDateChange',
      'handleCityChange',
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.props.actions.getProvinces();
  }

  getRegion(selectedOptions) {
    this.props.actions.getRegin(selectedOptions);
  }

  handleRegionChange(chooseName, chooseDetail) {
    chooseDetail[1] ? this.handleCityChange(chooseDetail[1].city_id) : this.handleCityChange('');
  }

  handleDateChange(date, dateString) {
    this.setState({ date: dateString });
  }

  handleCityChange(cityIds) {
    this.setState({ cityId: cityIds });
    this.props.actions.setCity(cityIds);
  }

  showModal() {
    this.setState({ visible: true, });
  }

  hideModal() {
    this.setState({ visible: false });
  }

  handleEditShow(record) {
    this.setState({ detail: record, isEdit: true, isAdd: false });
    this.showModal();
  }

  handleAddShow() {
    this.setState({ isAdd: true, isEdit: false });
    this.showModal();
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {

      if (!err) {
        const { date, cityId, isAdd, detail } = this.state;

        if (!isAdd) {
          values._id = detail._id;
          this.props.actions.editStatistic(values, this.handleRefresh.bind(this));
          this.hideModal();
        }

        if (isAdd) {
          if (cityId === '') {
            message.error('请选择城市');
            return;
          }
          if (date === '') {
            message.error('请选择日期');
            return;
          }
          values.date = date;
          values.city_id = cityId;
          this.props.actions.createStatistic(values, this.handleRefresh.bind(this));
          this.hideModal();
        }
      }
    });
  }

  handleRefresh() {
    const { month, city } = this.props;
    const condition = {
      cityId: city,
      month: month,
    };
    this.props.actions.getStatisticList(condition);
  }

  render() {

    const { formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    const { detail, visible, isEdit } = this.state;
    const { options, size, record } = this.props;
    if (!!detail) {
      let editDate = formatter.getMomentMonth(detail.date);
    }
    return (

      <div>
        {size === 'small'
          ? <a href="javascript:" onClick={this.handleEditShow.bind(this, record)}>
            编辑
          </a>
          : <Button type="primary" onClick={this.handleAddShow}>
            添加
          </Button>
        }

        <Modal
          title="操作统计记录"
          visible={visible}
          footer={[
            <Button key="back" onClick={this.hideModal}>取消</Button>,
            <Button
              type="primary"
              htmlType="submit"
              onClick={this.handleSubmit}
            >
              确定
            </Button>,
          ]}
          onCancel={this.hideModal}
        >

          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col span={24}>
                {!isEdit && <FormItem label="城市" {...formItemLayout} required>
                  {getFieldDecorator('city_id', {
                    initialValue: isEdit && detail.city_id,
                  })(
                    <Cascader
                      placeholder="请选择地区"
                      size="large"
                      changeOnSelect
                      options={options}
                      loadData={this.getRegion}
                      onChange={this.handleRegionChange}
                    />,
                  )}
                </FormItem>}

                {!isEdit && <FormItem label="日期" {...formItemLayout} required>
                  {getFieldDecorator('date', {
                    initialValue: isEdit && editDate,
                  })(
                    <DatePicker onChange={this.handleDateChange} />,
                  )}
                </FormItem>}

                <FormItem label="收件数" {...formItemLayout}>
                  {getFieldDecorator('shoujian_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.shoujian_count,
                  })(
                    <Input placeholder="请输入收件数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="系统进件数"{...formItemLayout}>
                  {getFieldDecorator('jinjian_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.jinjian_count,
                  })(
                    <Input placeholder="请填写系统进件数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="内控退回数"{...formItemLayout}>
                  {getFieldDecorator('neikongtuihui_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.neikongtuihui_count,
                  })(
                    <Input placeholder="请输入内控退回数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="方案转化数"{...formItemLayout}>
                  {getFieldDecorator('plan_change_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.plan_change_count,
                  })(
                    <Input placeholder="请输入方案转化数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="系统通过数"{...formItemLayout}>
                  {getFieldDecorator('system_success_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.system_success_count,
                  })(
                    <Input placeholder="请输入系统通过数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="系统驳回数"{...formItemLayout}>
                  {getFieldDecorator('system_bohui_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.system_bohui_count,
                  })(
                    <Input placeholder="请输入系统驳回数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="复议提交数"{...formItemLayout}>
                  {getFieldDecorator('system_fuyi_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.system_fuyi_count,
                  })(
                    <Input placeholder="请输入复议提交数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="交车完成数"{...formItemLayout}>
                  {getFieldDecorator('jiaoche_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.jiaoche_count,
                  })(
                    <Input placeholder="请输入交车完成数" type="number" />,
                  )}
                </FormItem>

                <FormItem label="贷后完成数"{...formItemLayout}>
                  {getFieldDecorator('daihou_count', {
                    rules: FormValidator.getRuleNotNull(),
                    initialValue: detail.daihou_count,
                  })(
                    <Input placeholder="请输入贷后完成数" type="number" />,
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

Add = Form.create()(Add);

function mapStateToProps(state) {
  const { options } = state.productDate;
  const { month, city } = state.statisticData;
  return { options, month, city };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getStatisticList,
      getRegin,
      getProvinces,
      createStatistic,
      editStatistic,
      setCity,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Add);
