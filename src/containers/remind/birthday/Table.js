import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'antd';

import text from '../../../config/text';
import BaseTable from '../../../components/base/BaseTable';

import Recorder from '../Recorder';

export default class TableBirthday extends BaseTable {
  render() {
    const self = this;

    const columns = [
      {
        title: '姓名',
        dataIndex: 'customer_name',
        key: 'customer_name',
        render: (value, record) => (
          <Link to={{ pathname: `/customer/detail/${record.customer_id}` }} target="_blank">
            {value}
          </Link>
        ),
      }, {
        title: '性别',
        dataIndex: 'customer_gender',
        key: 'customer_gender',
        render: value => text.gender[value],
      }, {
        title: '手机号',
        dataIndex: 'customer_phone',
        key: 'customer_phone',
      }, {
        title: '生日',
        dataIndex: 'remind_date',
        key: 'remind_date',
      }, {
        title: '状态',
        dataIndex: 'status_desc',
        key: 'status_desc',
        className: 'center',
        width: '85px',
        render: (value, record) => {
          let statusLabel = 'default';
          switch (Number(record.status)) {
            case 0:
              break;
            case 1:
              statusLabel = 'processing';
              break;
            case 2:
              statusLabel = 'success';
              break;
          }
          return <Badge status={statusLabel} text={value} />;
        },
      }, {
        title: '操作',
        dataIndex: 'handle',
        key: 'handle',
        className: 'center',
        render: (value, record) => (
          <Recorder
            record={record}
            task_type="6"
            onSuccess={self.props.onSuccess}
          />
        ),
      }];

    return this.renderTable(columns);
  }
}
