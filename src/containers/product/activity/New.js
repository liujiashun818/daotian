import React from 'react';
import { Button, DatePicker, Form, Icon, Input, message, Modal } from 'antd';

import api from '../../../middleware/api';
import Layout from '../../../utils/FormLayout';
import formatter from '../../../utils/DateFormatter';
import validator from '../../../utils/validator';
import FormValidator from '../../../utils/FormValidator';

import Qiniu from '../../../components/widget/UploadQiniu';
import BaseModalWithUpload from '../../../components/base/BaseModalWithUpload';

const FormItem = Form.Item;

class NewActivity extends BaseModalWithUpload {
  constructor(props) {
    super(props);
    const offline_time = new Date();
    offline_time.setFullYear(offline_time.getFullYear() + 10);

    this.state = {
      visible: false,
      offline_time,
      icon_pic_key: '',
      icon_pic_files: [],
      icon_pic_progress: {},
    };
    [
      'newActivity',
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  newActivity() {
    this.showModal();
  }

  handleSubmit() {
    this.props.form.validateFieldsAndScroll(errors => {
      if (!!errors) {
        message.error(validator.text.hasError);
        return;
      }

      const formData = this.props.form.getFieldsValue();
      formData.offline_time = formatter.date(formData.offline_time);
      formData.online_time = formatter.date(formData.online_time);

      api.ajax({
        url: api.activity.add(),
        type: 'POST',
        data: formData,
      }, () => {
        message.success('新增成功！');
        this.props.onSuccess();
        this.hideModal();
      }, () => {
        message.error('新增失败！');
      });
    });
  }

  render() {
    const { formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    const { visible, offline_time } = this.state;

    return (
      <span>
        <Button
          type="primary"
          className="ml20"
          onClick={this.newActivity}>
          新增活动
        </Button>
        <Modal
          title={<span><Icon type="plus" className="mr10" />新增活动</span>}
          visible={visible}
          width="680px"
          onOk={this.handleSubmit}
          onCancel={this.hideModal}
        >

          <Form>
            <FormItem label="顺序" {...formItemLayout}>
              {getFieldDecorator('order')(
                <Input type="number" placeholder="请输入活动排序" />,
              )}
            </FormItem>

            <FormItem label="上线时间" {...formItemLayout}>
              {getFieldDecorator('online_time', { initialValue: formatter.getMomentDate() })(
                <DatePicker placeholder="请选择活动上线时间" allowClear={false} />,
              )}
            </FormItem>

            <FormItem label="下线时间" {...formItemLayout}>
              {getFieldDecorator('offline_time', { initialValue: formatter.getMomentDate(offline_time) })(
                <DatePicker placeholder="请选择活动下线时间" allowClear={false} />,
              )}
            </FormItem>

            <FormItem label="标题" {...formItemLayout}>
              {getFieldDecorator('name')(
                <Input />,
              )}
            </FormItem>

            <FormItem label="链接" {...formItemLayout}>
              {getFieldDecorator('url', {
                rules: FormValidator.getRuleUrl(true),
                validateTrigger: 'onBlur',
              })(
                <Input type="url" />,
              )}
            </FormItem>

            <FormItem label="图片" {...formItemLayout} help="尺寸: 495*210px" required>
              {getFieldDecorator('icon_pic')(
                <Input type="hidden" />,
              )}
              <Qiniu
                prefix="icon_pic"
                saveKey={this.handleKey.bind(this)}
                source={api.system.getPublicPicUploadToken('icon_pic')}
                onDrop={this.onDrop.bind(this, 'icon_pic')}
                onUpload={this.onUpload.bind(this, 'icon_pic')}
              >
                {this.renderImage('icon_pic')}
              </Qiniu>
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

NewActivity = Form.create()(NewActivity);
export default NewActivity;
