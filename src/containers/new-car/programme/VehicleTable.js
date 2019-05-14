import React from 'react';
import { Link } from 'react-router-dom';
import {
  Badge,
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Switch,
  Tooltip,
} from 'antd';

import TableWithPagination from '../../../components/widget/TableWithPagination';
import Layout from '../../../utils/FormLayout';

const FormItem = Form.Item;

class TableIntention extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      plan_id: null,
      order: null,
      record: {},
    };

    [
      'handleShow',
      'handleCancel',
      'handleIsUpProduct',
      'handleIsDownProduct',
      'handleSubmit',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleShow(record) {
    this.setState({
      visible: true,
      plan_id: record._id,
      record: record,
    });
    console.log(record, 'record');
    this.props.form.setFieldsValue({ order: Number(record.order) > 0 ? record.order : '' });
    this.props.form.setFieldsValue({ is_hot: Number(record.is_hot) == 1 ? true : false });
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleIsUpProduct(e) {
    const plan_id = {
      plan_id: e._id,
    };
    this.props.planOnline(plan_id);
  }

  handleIsDownProduct(e) {
    const plan_id = {
      plan_id: e._id,
    };
    this.props.planOffline(plan_id);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_hot = 1;
        if (values.is_hot) {
          is_hot = 1;
        } else {
          is_hot = 0;
        }
        if (Number(values.order) > 255) {
          message.warning('最大数字限制为255');
        }
        const data = {
          plan_id: this.state.plan_id,
          is_hot: is_hot,
          order: values.order,
        };
        if (values.order > 4294967295) {
          message.warn('顺序不可大于4294967295');
          return;
        }
        this.props.planEditHot(data);
        this.setState({
          visible: false,
          record: {},
        });
      }
    });
  }

  render() {
    const { isFetching, page, total, list, updatePage } = this.props;
    const { record } = this.state;
    const { formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    const columns = [
      {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
        width: 98,
      }, {
        title: '车辆名称',
        dataIndex: 'auto_type_name',
        key: 'auto_type_name',
        render: value => {
          if (!value) {
            return '';
          }
          if (value.length <= 8) {
            return <span>{value}</span>;
          }
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      }, {
        title: '指导价',
        dataIndex: 'guide_price',
        key: 'guide_price',
        width: 75,
      }, {
        title: '首付',
        dataIndex: 'rent_down_payment',
        key: 'rent_down_payment',
        width: 75,
        render: value => Number(value).toFixed(0),
      }, {
        title: '月租',
        dataIndex: 'monthly_rent',
        key: 'monthly_rent',
        width: 50,
        render: value => Number(value).toFixed(0),
      }, {
        title: '产品名称',
        dataIndex: 'product_name',
        key: 'product_name',
        width: 89,
        render: value => {
          if (!value) {
            return '';
          }
          if (value.length <= 5) {
            return <span>{value}</span>;
          }
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      }, {
        title: '资源方产品',
        dataIndex: 'resource_product_name',
        key: 'resource_product_name',
        width: 89,
        render: value => {
          if (!value) {
            return '';
          }
          if (value.length <= 5) {
            return <span>{value}</span>;
          }
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      }, {
        title: '区域',
        dataIndex: 'city_name',
        key: 'city_name',
        width: 120,
      }, {
        title: '热门',
        dataIndex: 'is_hot',
        key: 'is_hot',
        width: 48,
        render: (text, record) => (
          <div>
            {record.is_hot === '1' ? '是' : '否'}
          </div>
        ),
      }, {
        title: '状态',
        dataIndex: 'status_name',
        key: 'status_name',
        className: 'center',
        width: '80px',
        render: (text, record) => (
          <div>
            {record.status_name === '使用中'
              ? <Badge status="success" text="使用中" />
              : <Badge status="default" text="已下架" />
            }
          </div>
        ),
      }, {
        title: '操作',
        key: 'action',
        width: '160px',
        className: 'center',
        render: (text, record) => (
          <div>
            {record.status_name === '使用中'
              ? <span>
                 <Link
                   to={{ pathname: `/new-car/programme-car/new/editVehicle/${record._id}` }}
                   target="_blank"
                 >编辑</Link>
                <span className="ant-divider" />
                 <Popconfirm
                   title="你确定要下架此方案吗?"
                   data_id={record.key}
                   onConfirm={() => this.handleIsDownProduct(record)}
                   onCancel={this.handleCancel}
                   okText="确定"
                   cancelText="取消"
                 >
                  <a href="#">下架</a>
                </Popconfirm>
                  <span className="ant-divider" />
                 <a href="#" onClick={() => this.handleShow(record)}>编辑热门</a>
		      </span>
              : <span>
                 <Link
                   to={{ pathname: `/new-car/programme-car/new/editVehicle/${record._id}` }}
                   target="_blank"
                 >
                     编辑
                 </Link>
                  <span className="ant-divider" />
                <Popconfirm
                  title="你确定要上架此方案吗?"
                  onConfirm={() => this.handleIsUpProduct(record)}
                  onCancel={this.handleCancel}
                  okText="确定" cancelText="取消"
                >
                  <a>上架</a>
                </Popconfirm>
	        </span>
            }
          </div>
        ),
      }];

    return (
      <div>
        <TableWithPagination
          isLoading={isFetching}
          columns={columns}
          dataSource={list}
          total={total}
          currentPage={page}
          onPageChange={updatePage}
        />

        <Modal
          visible={this.state.visible}
          title="设置热门"
          footer={
            <Row>
              <Col>
                <Button key="back" onClick={this.handleCancel}>取消</Button>
                <Button type="primary" onClick={this.handleSubmit}>确定</Button>
              </Col>
            </Row>}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem label="热门方案" {...formItemLayout} >
              {getFieldDecorator('is_hot', {
                valuePropName: 'checked',
              })(
                <Switch />,
              )}
            </FormItem>

            <FormItem
              label="顺序"
              help="值越大越靠前"
              {...formItemLayout}
            >
              {getFieldDecorator('order', {})(
                <Input
                  min='0'
                  placeholder="值越大越靠前"
                  maxLength='3'
                  type="number"
                  max="255"
                />,
              )}
            </FormItem>

          </Form>
        </Modal>
      </div>
    );
  }
}

TableIntention = Form.create()(TableIntention);

export default TableIntention;
