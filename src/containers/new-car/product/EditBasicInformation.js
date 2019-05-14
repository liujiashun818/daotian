import React from 'react';
import { Button, Form, Input, message, Row, Select, Tooltip } from 'antd';

import api from '../../../middleware/api';
import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';
import Qiniu from '../../../components/widget/UploadQiniu';
import UploadComponent from '../../../components/base/BaseUpload';
import styles from './style';

const FormItem = Form.Item;
const Option = Select.Option;

let productPicIndex = 0;
let applicationPicIndex = 0;
let attentionPicIndex = 0;

class EditBasicInformation extends UploadComponent {
  constructor(props) {
    super(props);
    this.state = {
      productKeys: [0],
      applicationKeys: [0],
      attentionKeys: [0],
      isGetPic: false,
      previewVisible: false,
      resourceList: [],
    };

    [
      'getPictures',
      'removePictures',
      'removeApplicationPictures',
      'handleProductPicsAdd',
      'handleAttentionPicsAdd',
      'handleApplicationPicsAdd',
      'handleSubmit',
      'handleResourcesList',
      'assembleProductPictures',
      'assembleApplicationPictures',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    const resourceList = this.props.resourceList;

    this.setState({
      resourceList,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { productDetail } = nextProps;
    const { isGetPic } = this.state;

    if (!!productDetail._id && !isGetPic) {
      this.getPictures(productDetail);
      this.setState({ isGetPic: true });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        values.product_pics = this.assembleProductPictures(values).join(',');
        values.process_pics = this.assembleApplicationPictures(values).join(',');
        values.attention_pics = this.assembleAttentionPictures(values).join(',');

        const isPicComplete = !values.product_pics || !values.process_pics ||
          !values.attention_pics ||
          values.product_pics.endsWith(',') || values.process_pics.endsWith(',') ||
          values.attention_pics.endsWith(',');

        values.donated_items = values.donated_items ? values.donated_items.join(',') : '';

        if (isPicComplete) {
          message.error('请上传图片');
          return;
        }

        this.props.editProduct(values);
      }
    });
  }

  getPictures(productDetail) {
    const stateObj = {};
    const productKeys = [];
    const applicationKeys = [];
    const attentionKeys = [];

    let productPics = [];
    let processPics = [];
    let attentionPics = [];

    try {
      productPics = productDetail.product_pics.split(',');
    } catch (e) {
    }

    try {
      processPics = productDetail.process_pics.split(',');
    } catch (e) {
    }

    try {
      attentionPics = productDetail.attention_pics.split(',');
    } catch (e) {
    }

    for (let i = 0; i < (productPics.length); i++) {
      productKeys.push(i);
    }

    for (let i = 0; i < (processPics.length); i++) {
      applicationKeys.push(i);
    }

    for (let i = 0; i < (attentionPics.length); i++) {
      attentionKeys.push(i);
    }

    this.setState({ productKeys, applicationKeys, attentionKeys });

    if (productPics.length > 0) {
      productPicIndex = productPics.length - 1;
      productPics.map((item, index) => {
        const picUrlProp = `product_pics_${index}`;
        const picKeyProp = `product_pics_${index}_key`;
        const picFilesProp = `product_pics_${index}_files`;
        const picProgressProp = `product_pics_${index}_progress`;

        stateObj[picKeyProp] = item;
        stateObj[picFilesProp] = [];
        stateObj[picProgressProp] = {};
        this.setState(stateObj);

        if (item) {
          this.getImageUrl(api.system.getPublicPicUrl(item), picUrlProp);
        }
      });
    }

    if (processPics.length > 0) {
      applicationPicIndex = processPics.length - 1;
      processPics.map((item, index) => {
        const picUrlProp = `application_pics_${index}`;
        const picKeyProp = `application_pics_${index}_key`;
        const picFilesProp = `application_pics_${index}_files`;
        const picProgressProp = `application_pics_${index}_progress`;

        stateObj[picKeyProp] = item;
        stateObj[picFilesProp] = [];
        stateObj[picProgressProp] = {};
        this.setState(stateObj);

        if (item) {
          this.getImageUrl(api.system.getPublicPicUrl(item), picUrlProp);
        }
      });
    }

    if (attentionPics.length > 0) {
      attentionPicIndex = attentionPics.length - 1;
      attentionPics.map((item, index) => {
        const picUrlProp = `attention_pics_${index}`;
        const picKeyProp = `attention_pics_${index}_key`;
        const picFilesProp = `attention_pics_${index}_files`;
        const picProgressProp = `attention_pics_${index}_progress`;

        stateObj[picKeyProp] = item;
        stateObj[picFilesProp] = [];
        stateObj[picProgressProp] = {};
        this.setState(stateObj);
        if (item) {
          this.getImageUrl(api.system.getPublicPicUrl(item), picUrlProp);
        }
      });
    }
  }

  handleProductPicsAdd() {
    productPicIndex++;
    const { form } = this.props;

    let productKeys = form.getFieldValue('productKeys');
    productKeys = productKeys.concat(productPicIndex);
    form.setFieldsValue({ productKeys });

    const keyProps = `product_pics_${productPicIndex}_key`;
    const filesProps = `product_pics_${productPicIndex}_files`;
    const progressProps = `product_pics_${productPicIndex}_progress`;

    this.setState({
      [keyProps]: '',
      [filesProps]: [],
      [progressProps]: {},
    });
  }

  handleApplicationPicsAdd() {
    applicationPicIndex++;
    const { form } = this.props;

    let applicationKeys = form.getFieldValue('applicationKeys');
    applicationKeys = applicationKeys.concat(applicationPicIndex);
    form.setFieldsValue({ applicationKeys });

    const keyProps = `application_pics_${applicationPicIndex}_key`;
    const filesProps = `application_pics_${applicationPicIndex}_files`;
    const progressProps = `application_pics_${applicationPicIndex}_progress`;

    this.setState({
      [keyProps]: '',
      [filesProps]: [],
      [progressProps]: {},
    });
  }

  handleAttentionPicsAdd() {
    attentionPicIndex++;
    const { form } = this.props;

    let attentionKeys = form.getFieldValue('attentionKeys');
    attentionKeys = attentionKeys.concat(attentionPicIndex);
    form.setFieldsValue({ attentionKeys });

    const keyProps = `attention_pics_${attentionPicIndex}_key`;
    const filesProps = `attention_pics_${attentionPicIndex}_files`;
    const progressProps = `attention_pics_${attentionPicIndex}_progress`;

    this.setState({
      [keyProps]: '',
      [filesProps]: [],
      [progressProps]: {},
    });
  }

  removePictures(k) {
    const { introduceCount } = this.state;

    const currentIntroduceCount = introduceCount - 1;

    this.setState({ introduceCount: currentIntroduceCount }, () => {
      if (Number(currentIntroduceCount) === 0) {
        this.handleProductPicsAdd();
      }
      const hideProp = `product_pics_hide_${k}`;
      this.setState({ [hideProp]: true });
    });
  }

  removeApplicationPictures(k) {
    const { introduceCount } = this.state;

    const currentIntroduceCount = introduceCount - 1;

    this.setState({ introduceCount: currentIntroduceCount }, () => {
      if (Number(currentIntroduceCount) === 0) {
        this.handleApplicationPicsAdd();
      }
      const hideProp = `application_pics_hide_${k}`;
      this.setState({ [hideProp]: true });
    });
  }

  handleMoveAttentionPics(k) {
    const hideProp = `attention_pics_hide_${k}`;
    this.setState({ [hideProp]: true });
  }

  assembleProductPictures(formData) {
    const pictures = [];
    const productKeys = formData.productKeys;
    for (let i = 0; i < productKeys.length; i++) {
      const deleteProp = `product_pics_hide_${i}`;
      const picKeyProp = `product_pics_${i}_key`;

      if (this.state[deleteProp]) {
        continue;
      }
      pictures.push(this.state[picKeyProp]);
    }
    delete formData.productKeys;
    return pictures;
  }

  assembleApplicationPictures(formData) {
    const pictures = [];
    const applicationKeys = formData.applicationKeys;
    for (let i = 0; i < applicationKeys.length; i++) {
      const deleteProp = `application_pics_hide_${i}`;
      const picKeyProp = `application_pics_${i}_key`;

      if (this.state[deleteProp]) {
        continue;
      }
      pictures.push(this.state[picKeyProp]);
    }
    delete formData.productKeys;
    return pictures;
  }

  assembleAttentionPictures(formData) {
    const pictures = [];
    const attentionKeys = formData.attentionKeys;
    for (let i = 0; i < attentionKeys.length; i++) {
      const deleteProp = `attention_pics_hide_${i}`;
      const picKeyProp = `attention_pics_${i}_key`;
      if (this.state[deleteProp]) {
        continue;
      }
      pictures.push(this.state[picKeyProp]);
    }
    delete formData.attentionKeys;
    return pictures;
  }

  handleResourcesList(value) {
    this.props.handleResourcesList(value);
  };

  render() {
    const { productDetail, resourceList, isManager } = this.props;
    const getMarketListDataList = resourceList.list;
    const { formItemLayoutHalf, formItemLayout_0024 } = Layout;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { productKeys, applicationKeys, attentionKeys } = this.state;
    const resourcesList = [];
    if (getMarketListDataList) {
      for (let i = 0; i < getMarketListDataList.length; i++) {
        resourcesList.push(
          <Option key={getMarketListDataList[i]._id} value={getMarketListDataList[i]._id}>
            {getMarketListDataList[i].name}
          </Option>);
      }
    }

    getFieldDecorator('productKeys', { initialValue: productKeys });
    getFieldDecorator('applicationKeys', { initialValue: applicationKeys });
    getFieldDecorator('attentionKeys', { initialValue: attentionKeys });

    const productPics = getFieldValue('productKeys').map(k => {
      const hideProp = `product_pics_hide_${k}`;
      return (
        <div className={this.state[hideProp] ? 'hide' : 'new-car-product-pic'} key={k}>
          <div>
            <Tooltip placement="top" title="双击添加或更换图片">
              <Qiniu
                prefix={`product_pics_${k}`}
                style={styles.QiniuWH}
                source={api.system.getPublicPicUploadToken('product_pics')}
                onDrop={this.onDrop.bind(this, `product_pics_${k}`)}
                onUpload={this.onUpload.bind(this, `product_pics_${k}`)}
                saveKey={this.handleKey.bind(this)}
              >
                {this.renderImage(`product_pics_${k}`, styles.introduceProgressStyle, {
                  height: '120px',
                  width: '100%',
                })}
              </Qiniu>
            </Tooltip>
          </div>
          <a
            href="javascript:;"
            className="mt10"
            onClick={() => this.removePictures(k)}
          >
            删除
          </a>
        </div>
      );
    });

    const applicationPics = getFieldValue('applicationKeys').map(k => {
      const hideProp = `application_pics_hide_${k}`;
      return (
        <div className={this.state[hideProp] ? 'hide' : 'new-car-product-pic'} key={k}>
          <div>
            <Tooltip placement="top" title="双击添加或更换图片">
              <Qiniu
                prefix={`application_pics_${k}`}
                style={styles.QiniuWH}
                saveKey={this.handleKey.bind(this)}
                onDrop={this.onDrop.bind(this, `application_pics_${k}`)}
                onUpload={this.onUpload.bind(this, `application_pics_${k}`)}
                source={api.system.getPublicPicUploadToken('application_pics')}
              >
                {this.renderImage(`application_pics_${k}`, styles.introduceProgressStyle, {
                  height: '120px',
                  width: '100%',
                })}
              </Qiniu>
            </Tooltip>
          </div>
          <a
            href="javascript:;"
            className="mt10"
            onClick={() => this.removeApplicationPictures(k)}
          >
            删除
          </a>
        </div>
      );
    });

    const attentionPics = getFieldValue('attentionKeys').map(k => {
      const hideProp = `attention_pics_hide_${k}`;
      return (
        <div className={this.state[hideProp] ? 'hide' : 'new-car-product-pic'} key={k}>
          <div>
            <Tooltip placement="top" title="双击添加或更换图片">
              <Qiniu
                prefix={`attention_pics_${k}`}
                style={styles.QiniuWH}
                source={api.system.getPublicPicUploadToken('attention_pics')}
                saveKey={this.handleKey.bind(this)}
                onDrop={this.onDrop.bind(this, `attention_pics_${k}`)}
                onUpload={this.onUpload.bind(this, `attention_pics_${k}`)}
              >
                {this.renderImage(`attention_pics_${k}`, styles.introduceProgressStyle, {
                  height: '120px',
                  width: '100%',
                })}
              </Qiniu>
            </Tooltip>
          </div>
          <a
            href="javascript:;"
            className="mt10"
            onClick={() => this.handleMoveAttentionPics(k)}
          >
            删除
          </a>
        </div>
      );
    });
    return (
      <div className="hqbasicInfor">

        {getFieldDecorator('product_id', { initialValue: productDetail._id })(
          <Input className="hide" />,
        )}
        {getFieldDecorator('city_id', { initialValue: productDetail.city_id })(
          <Input className="hide" />,
        )}
        <Form onSubmit={this.handleSubmit} className='mt40'>
          <FormItem label="适用区域" {...formItemLayoutHalf}>
            <span>{`${productDetail.province_name}/${productDetail.city_name}`}</span>
          </FormItem>

          <FormItem label="产品名称" {...formItemLayoutHalf}>
            {getFieldDecorator('name', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
              initialValue: productDetail.name,
            })(
              <Input
                placeholder="请输入产品名称"
                style={styles.width360}
                disabled={isManager}
              />,
            )}
          </FormItem>

          <FormItem label="资源方" {...formItemLayoutHalf}>
            {getFieldDecorator('resource_id', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
              onChange: this.handleResourcesList,
              initialValue: productDetail.resource_id,
            })(
              <Select
                placeholder="请选择类型"
                style={styles.width360}
                disabled={isManager}
              >
                {resourcesList}
              </Select>,
            )}
          </FormItem>

          <FormItem label="资源方产品" {...formItemLayoutHalf}>
            {getFieldDecorator('resource_product_name', {
              validateTrigger: 'onBlur',
              initialValue: productDetail.resource_product_name,
            })(
              <Input
                placeholder="资源方产品"
                style={styles.width360}
                disabled={isManager}
              />,
            )}
          </FormItem>

          <FormItem label="融资类型" {...formItemLayoutHalf}>
            {getFieldDecorator('type', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
              initialValue: productDetail.type,
            })(
              <Select
                placeholder="请选择融资类型"
                style={styles.width360}
                disabled
              >
                <Option value="1">固定首尾付</Option>
                <Option value="2">贷款分期</Option>
              </Select>,
            )}
          </FormItem>

          <FormItem label="牌照所属" {...formItemLayoutHalf}>
            {getFieldDecorator('plate_type', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
              initialValue: productDetail.plate_type,
            })(
              <Select
                placeholder="请选择牌照所属"
                style={styles.width360}
                disabled={isManager}
              >
                <Option value="1">公司户</Option>
                <Option value="2">个人户</Option>
              </Select>,
            )}
          </FormItem>

          <FormItem label="推荐理由" {...formItemLayoutHalf}>
            {getFieldDecorator('introduce', {
              rules: FormValidator.getRuleNotNull(),
              initialValue: productDetail.introduce,
            })(
              <Input
                placeholder="建议15个字以内，例如：新车含购置税和保险"
                style={styles.width360}
                disabled={isManager}
              />,
            )}
          </FormItem>

          <FormItem label="注意事项" {...formItemLayoutHalf}>
            {getFieldDecorator('attention', {
              rules: FormValidator.getRuleNotNull(),
              initialValue: productDetail.attention,
            })(
              <Input
                placeholder="建议15个字以内，例如：公司含，且需要保证金"
                style={styles.width360}
                disabled={isManager}
              />,
            )}
          </FormItem>

          <FormItem label="赠送项目" {...formItemLayoutHalf}>
            {getFieldDecorator('donated_items', {
              initialValue: productDetail.donated_items
                ? productDetail.donated_items.split(',')
                : [],
            })(
              <Select
                mode="multiple"
                placeholder="请选择赠送项目"
                style={styles.width360}
              >
                <Option key="含购置税">含购置税</Option>
                <Option key="含首年保险">含首年保险</Option>
              </Select>,
            )}
          </FormItem>

          <div className="product-pic">
            <FormItem label="产品详情" {...formItemLayoutHalf} required>
              {productPics}
              <Button
                className='buttonAdd'
                type="dashed"
                icon="plus"
                onClick={this.handleProductPicsAdd}
              >
                添加
              </Button>
            </FormItem>
          </div>

          <div className="application-pic">
            <FormItem label="申请流程" {...formItemLayoutHalf} required>
              {applicationPics}
              <Button
                className="buttonAdd"
                type="dashed"
                icon="plus"
                onClick={this.handleApplicationPicsAdd}
              >
                添加
              </Button>
            </FormItem>
          </div>

          <div className="attention-pic">
            <FormItem label="购车须知"{...formItemLayoutHalf} required>
              {attentionPics}
              <Button
                type="dashed"
                className="buttonAdd"
                icon="plus"
                onClick={this.handleAttentionPicsAdd}
              >
                添加
              </Button>
            </FormItem>
          </div>

          <FormItem {...formItemLayout_0024}>
            <Row type="flex" justify="center">
              <Button
                type="primary"
                htmlType="submit"
                disabled={isManager}
              >
                保存
              </Button>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

EditBasicInformation = Form.create()(EditBasicInformation);
export default EditBasicInformation;
