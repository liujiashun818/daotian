import React from 'react';
import { Button, Cascader, Col, Form, Input, message, Row, Select, Tooltip } from 'antd';

import api from '../../../middleware/api';
import FormValidator from '../../../utils/FormValidator';
import Layout from '../../../utils/FormLayout';
import Qiniu from '../../../components/widget/UploadQiniu';
import UploadComponent from '../../../components/base/BaseUpload';
import AddResource from './AddResource';

import styles from './style';

require('./index.less');

const FormItem = Form.Item;
const Option = Select.Option;
let productPicIndex = 0;
let applicationPicIndex = 0;
let attentionPicIndex = 0;

class AddBasicInformation extends UploadComponent {
  constructor(props) {
    super(props);
    this.state = {
      productKeys: [0],
      applicationKeys: [0],
      attentionKeys: [0],
      resourceList: [],
      cityId: '',
    };

    [
      'handleSubmit',
      'handleApplicationsPicsAdd',
      'handleAttentionPicsAdd',
      'handleProductPicsAdd',

      'removePictures',
      'handleMoveApplicationPics',
      'assembleProductPictures',
      'assembleApplicationPictures',
      'handleResourceChange',
      'handleRegionChange',
      'getRegin',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.resourceCreateResponse !== '' || undefined) {
      if (this.props.resourceCreateResponse !== nextProps.resourceCreateResponse) {
        this.props.form.setFieldsValue({ resource_id: String(nextProps.resourceCreateResponse) });
        this.props.getMaterialList(String(nextProps.resourceCreateResponse));
      }
    }
  }

  componentDidMount() {
    const { type, resourceList } = this.props;
    this.setState({ resourceList, type });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { cityId } = this.state;

        values.product_pics = this.assembleProductPictures(values).join(',');
        values.process_pics = this.assembleApplicationPictures(values).join(',');
        values.attention_pics = this.assembleAttentionPictures(values).join(',');
        values.city_id = cityId;
        values.donated_items = values.donated_items ? values.donated_items.join(',') : '';

        const isPicComplete = !values.product_pics || !values.process_pics ||
          !values.attention_pics ||
          values.product_pics.endsWith(',') || values.process_pics.endsWith(',') ||
          values.attention_pics.endsWith(',');

        if (isPicComplete) {

          message.error('请上传图片');
          return;
        }
        if (!cityId) {

          message.error('请选择适用区域');
          return;
        }
        if (String(this.props.basicKey) === '2') {

          const data = {
            product_id: this.props.createProductResponse.detail._id,
            name: values.name,
            resource_id: values.resource_id,
            plate_type: values.plate_type,
            introduce: values.introduce,
            attention: values.attention,
            product_pics: values.product_pics,
            process_pics: values.process_pics,
            resource_product_name: values.resource_product_name,
          };
          this.props.editProduct(data);
          return;
        }
        this.props.createProduct(values);
      }
    });
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

  handleApplicationsPicsAdd() {
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
    const hideProp = `product_pics_hide_${k}`;
    this.setState({ [hideProp]: true });
  }

  handleMoveApplicationPics(k) {
    const hideProp = `application_pics_hide_${k}`;
    this.setState({ [hideProp]: true });
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

  handleResourceChange(value) {
    this.props.getMaterialList(value);
  }

  handleRegionChange(chooseName, chooseDetail) {
    if (!!chooseDetail[1]) {
      this.setState({ cityId: chooseDetail[1].city_id });
    }
  }

  getRegin(selectedOptions) {
    this.props.getRegin(selectedOptions);
  }

  handleChange(value) {
    console.log('value', value);
  }

  render() {
    const { resourceCreateResponse, resourceList, options, basicKey } = this.props;
    const getMarketListDataList = resourceList.list;
    const { formItemLayoutHalf, formItemLayout_0024, formItemLayout } = Layout;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { productKeys, applicationKeys, attentionKeys } = this.state;
    const resourcesList = [];
    if (getMarketListDataList) {
      for (let i = 0; i < getMarketListDataList.length; i++) {
        resourcesList.push(
          <Option
            key={getMarketListDataList[i]._id}
            value={getMarketListDataList[i]._id}
          >
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
                style={styles.QiniuWH}
                prefix={`product_pics_${k}`}
                source={api.system.getPublicPicUploadToken('product_pics')}
                saveKey={this.handleKey.bind(this)}
                onDrop={this.onDrop.bind(this, `product_pics_${k}`)}
                onUpload={this.onUpload.bind(this, `product_pics_${k}`)}
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
                source={api.system.getPublicPicUploadToken('application_pics')}
                saveKey={this.handleKey.bind(this)}
                onDrop={this.onDrop.bind(this, `application_pics_${k}`)}
                onUpload={this.onUpload.bind(this, `application_pics_${k}`)}
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
            onClick={() => this.handleMoveApplicationPics(k)}
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
      <div className="hqbasicInfor mt40">
        <Form onSubmit={this.handleSubmit}>
          <FormItem label="适用区域" {...formItemLayoutHalf} required>
            <Cascader
              options={options}
              loadData={this.getRegin}
              onChange={this.handleRegionChange}
              changeOnSelect
              style={styles.width360}
              placeholder="请选择地区"
              size="large"
            />
          </FormItem>

          <FormItem label="产品名称" {...formItemLayoutHalf}>
            {getFieldDecorator('name', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请输入产品名称" style={styles.width360} />,
            )}
          </FormItem>

          <Row>
            <Col span={12} className='mb10'>
              <FormItem label="资源方" {...formItemLayout}>
                {getFieldDecorator('resource_id', {
                  rules: FormValidator.getRuleNotNull(),
                  validateTrigger: 'onBlur',
                  onChange: this.handleResourceChange,
                  initialValue: resourceCreateResponse == ''
                    ? <span style={{ color: '#d9d9d9' }}>请选择资源方</span>
                    : String(resourceCreateResponse),
                })(
                  <Select
                    placeholder="请选择类型"
                    size="large"
                    style={styles.width360}
                  >
                    {resourcesList}
                  </Select>,
                )}
                <span style={styles.marginLeft}>
                   <AddResource
                     style={styles.marginLeft}
                     createResource={this.props.createResource}
                     getResourceList={this.props.getResourceList}
                   />
                </span>

              </FormItem>
            </Col>
          </Row>
          <FormItem label="资源方产品" {...formItemLayoutHalf}>
            {getFieldDecorator('resource_product_name', {
              validateTrigger: 'onBlur',
            })(
              <Input placeholder="请输入产品名称" style={styles.width360} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayoutHalf}
            label="融资类型"

          >
            {getFieldDecorator('type', {
              rules: FormValidator.getRuleNotNull(),
              initialValue: this.props.type,
            })(
              <Select
                placeholder="请选择融资类型"
                style={styles.width360}
                disabled
              >
                <Option value="1">固定首尾付类型</Option>
                <Option value="2">贷款分期</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayoutHalf}
            label="牌照所属"
          >
            {getFieldDecorator('plate_type', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
            })(
              <Select placeholder="请选择牌照所属" style={styles.width360}>
                <Option value="1">公司户</Option>
                <Option value="2">个人户</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem label="推荐理由" {...formItemLayoutHalf}>
            {getFieldDecorator('introduce', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder="建议15个字以内，例如：新车含购置税和保险"
                style={styles.width360}
              />,
            )}
          </FormItem>
          <FormItem label="注意事项" {...formItemLayoutHalf}>
            {getFieldDecorator('attention', {
              rules: FormValidator.getRuleNotNull(),
              validateTrigger: 'onBlur',
            })(
              <Input
                placeholder="建议15个字以内，例如：公司户，且需要保证金"
                style={styles.width360}
              />,
            )}
          </FormItem>
          <FormItem label="赠送项目" {...formItemLayoutHalf}>
            {getFieldDecorator('donated_items')(
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
            <FormItem
              label="产品详情"
              {...formItemLayoutHalf}
              required
            >
              {productPics}
              <Button
                type="dashed"
                className="buttonAdd"
                icon="plus"
                onClick={this.handleProductPicsAdd}
              >
                添加
              </Button>
            </FormItem>
          </div>

          <div className="application-pic">
            <FormItem
              label="申请流程"
              {...formItemLayoutHalf}
              required
            >
              {applicationPics}
              <Button
                type="dashed"
                className="buttonAdd"
                icon="plus"
                onClick={this.handleApplicationsPicsAdd}
              >
                添加
              </Button>
            </FormItem>
          </div>


          <div className="attention-pic">
            <FormItem
              label="购车须知"
              {...formItemLayoutHalf}
              required
            >
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
              <Button type="primary" htmlType="submit">{String(basicKey) === '2'
                ? '保存'
                : '下一步'}</Button>
            </Row>
          </FormItem>
        </Form>
      </div>
    );
  }
}

AddBasicInformation = Form.create()(AddBasicInformation);
export default AddBasicInformation;
