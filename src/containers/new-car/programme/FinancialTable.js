import React from 'react';
import { Link } from 'react-router-dom';
import { Badge, Popconfirm, Tooltip } from 'antd';

import TableWithPagination from '../../../components/widget/TableWithPagination';

export default class TableIntention extends React.Component {
  constructor(props) {
    super(props);
    [
      'handleUpPlan',
      'handleDownPlan',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleUpPlan(e) {
    const plan_id = {
      plan_id: e._id,
    };
    this.props.planOnline(plan_id);
  }

  handleDownPlan(e) {
    const plan_id = {
      plan_id: e._id,
    };
    this.props.planOffline(plan_id);
  }

  render() {
    const { isFetching, page, total, list, updatePage } = this.props;
    const columns = [
      {
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
        title: '产品名称',
        dataIndex: 'product_name',
        key: 'product_name',
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
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
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
        title: '状态',
        dataIndex: 'status_name',
        key: 'status_name',
        className: 'center',
        width: 80,
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
        className: 'center',
        width: 100,
        render: (text, record) => (
          <div>
            {record.status_name === '使用中'
              ? <span>
                <Link
                  to={{ pathname: `/new-car/programme-car/new/editFinancial/${record._id}` }}
                  target="_blank"
                >
                  编辑
                </Link>
                <span className="ant-divider" />
                          <Popconfirm
                            title="你确定要下架此方案吗?"
                            data_id={record.key}
                            okText="确定"
                            cancelText="取消"
                            onConfirm={() => this.handleDownPlan(record)}
                          >
                          <a href="#">下架</a>
                        </Popconfirm>
		             </span>
              : <span>
	               <Link
                   to={{ pathname: `/new-car/programme-car/new/editFinancial/${record._id}` }}
                   target="_blank"
                 >
                     编辑
                   </Link>
                <span className="ant-divider" />
                <Popconfirm
                  title="你确定要上架此方案吗?"
                  okText="确定"
                  cancelText="取消"
                  onConfirm={() => this.handleUpPlan(record)}
                >
                  <a href="#">上架</a>
                </Popconfirm>
	        </span>
            }
          </div>
        ),
      }];

    return (
      <TableWithPagination
        isLoading={isFetching}
        columns={columns}
        dataSource={list}
        total={total}
        currentPage={page}
        onPageChange={updatePage}
      />
    );
  }
}
