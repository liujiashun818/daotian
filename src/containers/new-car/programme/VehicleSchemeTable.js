import React from 'react';
import { Link } from 'react-router-dom';

import { Badge, Button, Col, Form, Input, message, Modal, Popconfirm, Row, Switch } from 'antd';
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
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      plan_id: record._id,
      record,
    });
    this.props.form.setFieldsValue({ 'order': Number(record.order) > 0 ? record.order : '' });
    this.props.form.setFieldsValue({ 'is_hot': !(Number(record.is_hot) === 0) });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  cancel = (e) => {
    message.error('Click on No');
  };
  isUpProduct = (e) => {
    let plan_id = {
      plan_id: e._id,
    };
    this.props.post_marketPlanOnline(plan_id);
  };
  isDownProduct = (e) => {
    let plan_id = {
      plan_id: e._id,
    };
    this.props.post_marketPlanOffline(plan_id);
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let is_hot = 1;
        if (values.is_hot) {
          is_hot = 1;
        } else {
          is_hot = 0;
        }
        let data = {
          plan_id: this.state.plan_id,
          is_hot: is_hot,
          order: values.order,
        };
        console.log(data);
        this.props.post_marketPlanEditHot(data);
        this.setState({ visible: false });
      }
    });
  };

  get_marketPlanDetail(record) {
    this.props.get_marketPlanDetail;
  };

  render() {
    let { isFetching, page, total, list, hqOrOperate } = this.props;
    let { record } = this.state;
    const { formItemLayout } = Layout;
    const { getFieldDecorator } = this.props.form;
    console.log(isFetching + '是否加载中');
    const columns = [
      {
        title: '排序',
        dataIndex: 'order',
        key: 'order',
      }, {
        title: '车辆名称',
        dataIndex: 'auto_type_name',
        key: 'auto_type_name',
      }, {
        title: '指导价',
        dataIndex: 'guide_price',
        key: 'guide_price',
      }, {
        title: '首付',
        dataIndex: 'rent_down_payment',
        key: 'rent_down_payment',
        render: value => Number(value).toFixed(0),
      }, {
        title: '月租',
        dataIndex: 'monthly_rent',
        key: 'monthly_rent',
        render: value => Number(value).toFixed(0),
      }, {
        title: '资源方产品',
        dataIndex: 'resource_product_name',
        key: 'resource_product_name',
      }, {
        title: '产品名称',
        dataIndex: 'product_name',
        key: 'product_name',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
      }, {
        title: '热门方案',
        dataIndex: 'is_hot',
        key: 'is_hot',
        render: (text, record) => (
          <div>
            {record.is_hot == 1 ? '是' : '否'}
          </div>
        ),
      }, {
        title: '方案状态',
        dataIndex: 'status_name',
        key: 'status_name',
        className: 'center',
        width: '80px',
        render: (text, record) => (
          <div>
            {record.status_name == '使用中' ? <Badge status='success' text="使用中" />
              : <Badge status='default' text="已下架" />}
          </div>
        ),
      }, {
        title: '操作',
        key: 'action',
        width: '180px',
        className: 'center',
        render: (text, record) => (
          <div>
            {record.status_name == '使用中' ? <span>
		    		  <Link to={{ pathname: `/new-car/programme-car/new/editVehiclePlay/${record._id}` }}
                    target="_blank">
                     编辑
                 </Link>
		    		  <span className="ant-divider" />
                 <Popconfirm title="你确定要下架此产品吗?" data_id={record.key}
                             onConfirm={() => this.isDownProduct(record)}
                             onCancel={this.cancel} okText="确定" cancelText="取消">
                  <a href="#">下架</a>
                </Popconfirm>
                  <span className="ant-divider" />
                 <a href="#" onClick={() => {
                   this.showModal(record);
                 }}>
	                  编辑热门
	             </a>
		      </span>
              : <span>
                 <Link to={{ pathname: `/new-car/programme-car/new/editVehiclePlay/${record._id}` }}
                       target="_blank">
                     编辑
                 </Link>
                  <span className="ant-divider" />
                <Popconfirm title="你确定要上架此方案吗?" onConfirm={() => this.isUpProduct(record)}
                            onCancel={this.cancel}
                            okText="确定" cancelText="取消">
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
          dataSource={this.props.list}
          total={total}
          currentPage={page}
          onPageChange={this.props.updatePage}
        />
        <Modal
          visible={this.state.visible}
          title="设置热门"
          footer={<Row>
            <Col>
              <Button key="back" onClick={this.handleCancel}>取消</Button>
              <Button type="primary" onClick={this.handleSubmit}>确定</Button>

            </Col>
          </Row>}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="热门方案"
            >
              {getFieldDecorator('is_hot', {
                valuePropName: 'checked',
                initialValue: record.is_hot == 0 ? false : true,
              })(
                <Switch />,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              help="值越大越靠前"
              label="顺序"
            >
              {getFieldDecorator('order', {
                initialValue: record.order,
              })(
                <Input type='number' placeholder="值越大越靠前" />,
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