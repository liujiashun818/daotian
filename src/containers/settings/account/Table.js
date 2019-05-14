import React from 'react';
import { message, Popconfirm, Tooltip } from 'antd';

import api from '../../../middleware/api';
import text from '../../../config/text';

import BaseTable from '../../../components/base/BaseTable';

import Edit from './Edit';

export default class Table extends BaseTable {

  handleStop(id, status) {
    api.ajax({
      url: api.admin.account.modifyStatus(),
      type: 'POST',
      data: {
        _id: id,
        status,
      },
    }, () => {
      message.success('停用成功');
      this.props.onSuccess();
    }, err => {
      message.error(`停用失败[${err}]`);
    });
  }

  render() {
    const self = this;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 110,
      }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 110,
      }, {
        title: '账号类型',
        dataIndex: 'user_type',
        key: 'user_type',
        width: 103,
        render: userType => text.settings.account.userType[userType],
      }, {
        title: '负责区域',
        dataIndex: 'admin_city_infos',
        key: 'admin_city_infos',
        render: value => {
          if (!value || !Array.isArray(value)) {
            return '--';
          }
          const cityName = value.map(item => item.name).join(',');

          if (cityName.length <= 6) {
            return <span>{cityName}</span>;
          }

          return (
            <Tooltip placement="topLeft" title={cityName}>
              {cityName}
            </Tooltip>
          );
        },
      }, {
        title: '负责连锁',
        dataIndex: 'chain_name',
        key: 'chain_name',
        width: 145,
        render: value => {
          if (!value) {
            return '--';
          }
          if (value.length <= 9) {
            return <span>{value}</span>;
          }
          return (
            <Tooltip placement="topLeft" title={value}>
              {value}
            </Tooltip>
          );
        },
      }, {
        title: '创建人',
        dataIndex: 'create_user_name',
        key: 'create_user_name',
        width: 110,
      }, {
        title: '创建时间',
        dataIndex: 'ctime',
        key: 'ctime',
        width: 160,
      }, {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        className: 'center',
        width: 90,
        render(id, record) {
          return (
            <span>
            <Edit id={id} onSuccess={self.props.onSuccess} />

            <span className="ant-divider" />

            <Popconfirm
              placement="topRight"
              title="确定要停用吗？"
              onConfirm={self.handleStop.bind(self, id, -1)}
            >
              {record.status === '-1' ? <a href="javascript:" disabled>已停用</a> :
                <a href="javascript:">停用</a>
              }
            </Popconfirm>
          </span>
          );
        },
      }];

    return this.renderTable(columns);
  }
}
