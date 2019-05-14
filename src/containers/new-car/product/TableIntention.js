import React from 'react';
import { Link } from 'react-router-dom';

import { Badge, Popconfirm } from 'antd';

import TableWithPagination from '../../../components/widget/TableWithPagination';

import styles from './style';

export default class TableIntention extends React.Component {

  constructor(props) {
    super(props);

    [
      'handleIsUpProduct',
      'handleIsDownProduct',
    ].map(method => this[method] = this[method].bind(this));
  }

  handleIsUpProduct(e) {
    const product_id = {
      product_id: e._id,
    };
    this.props.editProductOnline(product_id);
  }

  handleIsDownProduct(e) {
    const product_id = {
      product_id: e._id,
    };
    this.props.editProductOffline(product_id);
  }

  render() {
    const { isFetching, page, total, list, type, updatePage } = this.props;

    const columns = [
      {
        title: '产品名称',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '资源方产品',
        dataIndex: 'resource_product_name',
        key: 'resource_product_name',
      }, {
        title: '资源方',
        dataIndex: 'resource_name',
        key: 'resource_name',
      }, {
        title: '区域',
        dataIndex: 'city_name',
        key: 'city_name',
      }, {
        title: '指定车型',
        dataIndex: 'is_specific_auto_type',
        key: 'is_specific_auto_type',
        className: !!(String(type) === '2') ? '' : 'hide',
        render: (text, record) => (
          <div>
            {String(record.is_specific_auto_type) === '0' ? '否' : '是'}
          </div>
        ),
      }, {
        title: '产品状态',
        dataIndex: 'status_name',
        key: 'status_name',
        className: 'center',
        width: 180,
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
        width: 180,
        className: 'center',
        render: (text, record) => (
          <div>
            {this.props.isManager
              ? (record.status_name === '使用中'
                ? <span>
	              <Link
                  to={{ pathname: `/new-car/product/edit/${record._id}` }}
                  target="_blank"
                >
                 	编辑
                 </Link>
                  <span className="ant-divider" />
                      <Popconfirm
                        title="产品下架后，该产品所有方案随之下架，确定操作吗?"
                        overlayStyle={styles.width216}
                        data_id={record.key}
                        okText="确定"
                        cancelText="取消"
                        arrowPointAtCenter={true}
                        onConfirm={() => this.handleIsDownProduct(record)}
                      >
                      <a href="#">下架</a>
                      </Popconfirm>
                  {this.props.type === '1'
                    ? <Link
                      to={{ pathname: `/new-car/programme-car/new/addVehicleProgramme/${record._id}` }}
                      target="_blank"
                      >
                      <span className="ant-divider" />创建方案
                    </Link>
                    : ( String(record.is_specific_auto_type) === '1'
                      && <Link
                        to={{ pathname: `/new-car/programme-car/new/addFinancialProgramme/${record._id}` }}
                        target="_blank"
                        >
                        <span className="ant-divider" />创建方案
                      </Link>)
                  }
		                </span>
                : <span>
	              <Link to={{ pathname: `/new-car/product/edit/${record._id}` }} target="_blank">
                 	编辑
                 </Link>
                <span className="ant-divider" />
                <Popconfirm
                  title="你确定要上架此产品吗?"
                  okText="确定"
                  cancelText="取消"
                  onCancel={this.cancel}
                  onConfirm={() => this.handleIsUpProduct(record)}
                >
                  <a href="#">上架</a>
                </Popconfirm>
	            </span>)
              //区域管理员
              : (record.status_name === '使用中'
                ? <span>
                  <Link to={{ pathname: `/new-car/product/edit/${record._id}` }}
                    target="_blank"
                  >
                 	详情
                   </Link>
		    		     <span className="ant-divider" />
                  {this.props.type === '2'
                    ? <Link
                      to={{ pathname: `/new-car/programme-car/new/addFinancialProgramme/${record._id}` }}
                      target="_blank"
                    >
                      创建方案
                    </Link>
                    : <Link
                      to={{ pathname: `/new-car/programme-car/new/addVehicleProgramme/${record._id}` }}
                      target="_blank"
                    >
                      创建方案
                    </Link>
                  }
		               </span>
                : <span>
                  <Link to={{ pathname: `/new-car/product/edit/${record._id}` }} target="_blank">
                 	详情
                  </Link>
		             </span>)}
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
