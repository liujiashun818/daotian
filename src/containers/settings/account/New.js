import React from 'react';
import { Button, Form, Icon, Input, message, Modal, Radio, Select, Cascader } from 'antd';

import BaseModal from '../../../components/base/BaseModal';

import api from '../../../middleware/api';
import Layout from '../../../utils/FormLayout';
import validator from '../../../utils/validator';
import FormValidator from '../../../utils/FormValidator';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class New extends BaseModal {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      chains: [],
      keys: [1],
      options: [],
      cityIds: [],
    };

    [
      'handleSubmit',
      'handleUserTypeChange',
      'getProvinces',
      'renderRegins',
      'handleRegionChange',
      'getRegin',
      'handleReginInsert',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    this.getProvinces();
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll((errors, values) => {
      if (!!errors) {
        message.error(validator.text.hasError);
        return;
      }

      const { cityIds } = this.state;
      values.city_ids = cityIds.filter(item => !!item).join(',');

      if (String(values.user_type) === '2') {
        if (!values.city_ids) {
          message.error('请选择区域');
          return false;
        }
      }

      api.ajax({
        url: api.admin.account.add(),
        type: 'POST',
        data: values,
      }, () => {
        message.success('创建账号成功');
        this.hideModal();
        this.props.onSuccess();
      });
    });
  }

  handleUserTypeChange(userType) {
    const { chains } = this.state;
    if (chains.length === 0 && userType === '1') {
      this.getChains();
    }
  }

  handleRegionChange(index, values) {
    const { cityIds } = this.state;

    if (values.length === 2) {
      cityIds[index] = values[1].city_id;
      this.setState({ cityIds });
    }
  }

  handleReginDelete(index) {
    const { keys, cityIds } = this.state;
    keys[index] = null;
    cityIds[index] = null;

    this.setState({ keys, cityIds });
  }

  handleReginInsert() {
    const { keys } = this.state;
    keys.push(keys.length + 1);
    this.setState({ keys });
  }

  hideModal() {
    this.props.form.resetFields();
    this.setState({ visible: false });
  }

  getChains() {
    api.ajax({ url: api.overview.getAllChains() }, data => {
      this.setState({ chains: data.res.list });
    });
  }

  getProvinces() {
    api.ajax({ url: api.system.getProvinces() }, data => {
      const provinces = data.res.province_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = false;
        return item;
      });
      this.setState({ options: provinces });
    });
  }

  getRegin(selectedOptions) {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    // 获取市
    api.ajax({ url: api.system.getCities(targetOption.name) }, data => {
      targetOption.loading = false;
      targetOption.children = [];
      data.res.city_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = true;
        targetOption.children.push(item);
      });
      this.setState({
        options: [...this.state.options],
      });
    });
  }

  renderRegins() {
    const { keys, options } = this.state;
    const { formItemLayout } = Layout;
    let indexSort = 0;

    return keys.map((item, index) => {
      !!item && indexSort++;

      return (
        <div key={`${String(item)}${index + 1}`}>
          {
            item && <FormItem{...formItemLayout} label={`区域${indexSort}`}>
              <Cascader
                options={options}
                loadData={this.getRegin}
                onChange={(value, values) => this.handleRegionChange(index, values)}
                changeOnSelect
                style={{ width: 220 }}
                placeholder="请选择地区"
                size="large"
                allowClear={false}
              />

              <a
                href="javascript:;"
                onClick={() => this.handleReginDelete(index)}
                className={Number(index) === 0 ? 'hide' : 'ml20'}
              >
                删除
              </a>
            </FormItem>
          }
        </div>
      );
    });
  }

  render() {
    const { formItemLayout, selectStyle } = Layout;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { visible, chains } = this.state;

    return (
      <span>
        <Button type="primary" onClick={this.showModal}>创建账号</Button>

        <Modal
          title={<span><Icon type="plus" /> 创建账号</span>}
          visible={visible}
          width={720}
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >
          <Form>
            <FormItem label="姓名" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: FormValidator.getRuleNotNull(),
                validatorTrigger: 'onBlur',
              })(
                <Input placeholder="请输入姓名" />,
              )}
            </FormItem>

            <FormItem label="性别" {...formItemLayout}>
              {getFieldDecorator('gender', {
                initialValue: '1',
              })(
                <RadioGroup>
                  <Radio value="1">男</Radio>
                  <Radio value="0">女</Radio>
                </RadioGroup>,
              )}
            </FormItem>

            <FormItem label="手机号" {...formItemLayout}>
              {getFieldDecorator('phone', {
                rules: FormValidator.getRulePhoneNumber(),
                validatorTrigger: 'onBlur',
              })(
                <Input placeholder="请输入手机号" />,
              )}
            </FormItem>

            <FormItem label="账号类型" {...formItemLayout}>
              {getFieldDecorator('user_type', {
                initialValue: '3',
                rules: FormValidator.getRuleNotNull(),
                validatorTrigger: 'onBlur',
                onChange: this.handleUserTypeChange,
              })(
                <Select {...selectStyle} placeholder="请选择账号类型">
                  <Option value="1">连锁店管理员</Option>
                  <Option value="2">区域管理员</Option>
                  <Option value="3">总公司管理员</Option>
                </Select>,
              )}
            </FormItem>

            {getFieldValue('user_type') === '1' && (
              <FormItem label="选择连锁" {...formItemLayout}>
                {getFieldDecorator('chain_id')(
                  <Select {...selectStyle} placeholder="请选择连锁店">
                    {chains.map(chain => <Option key={chain._id}>{chain.chain_name}</Option>)}
                  </Select>,
                )}
              </FormItem>
            )}

            {getFieldValue('user_type') === '2' && this.renderRegins()}
            {
              getFieldValue('user_type') === '2' && (
                <Button
                  onClick={this.handleReginInsert}
                  className="font-size-14"
                  style={{ marginLeft: 170 }}
                  type="primary"
                >
                  添加区域
                </Button>
              )
            }
          </Form>
        </Modal>
      </span>
    );
  }
}

New = Form.create()(New);
export default New;
