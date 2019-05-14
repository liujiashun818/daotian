import React from 'react';

import { Table } from 'antd';

import Add from './Add';

class TableList extends React.Component {

  render() {
    const { statistics, detail } = this.props;

    const columns = [
      {
        title: '日期',
        dataIndex: 'date',
        key: 'date',
        width: 130,
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: '合计',
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '收件数',
        dataIndex: 'shoujian_count',
        key: 'shoujian_count',
      }, {
        title: '系统进件数',
        dataIndex: 'jinjian_count',
        key: 'jinjian_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '内控退回数',
        dataIndex: 'neikongtuihui_count',
        key: 'neikongtuihui_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '方案转化数',
        dataIndex: 'plan_change_count',
        key: 'plan_change_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '系统通过数',
        dataIndex: 'system_success_count',
        key: 'system_success_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '系统驳回数',
        dataIndex: 'system_bohui_count',
        key: 'system_bohui_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '复议提交数',
        dataIndex: 'system_fuyi_count',
        key: 'system_fuyi_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '交车完成数',
        dataIndex: 'jiaoche_count',
        key: 'jiaoche_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '货后完成数',
        dataIndex: 'daihou_count',
        key: 'daihou_count',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return value;
          }
        },
      }, {
        title: '进件交车率',
        key: 'jiaoche_lv',
        dataIndex: 'jiaoche_lv',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return <span>
              {((Number(record.daihou_count) === 0) || (Number(record.jinjian_count) === 0))
                ? '0'
                : `${((record.daihou_count / record.jinjian_count) * 100).toFixed(2)}%`
              }
              </span>;
          }
        },
      }, {
        title: '方案转化率',
        dataIndex: 'fangan_lv',
        key: 'fangan_lv',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return <span>
                {(
                  (Number(record.plan_change_count) === 0) || (Number(record.shoujian_count) === 0)
                )
                  ? '0'
                  : `${((record.plan_change_count / record.shoujian_count) * 100).toFixed(2)}%`
                }
              </span>;
          }
        },
      }, {
        title: '系统通过率',
        dataIndex: 'xitong_lv',
        key: 'xitong_lv',
        render: (value, record, index) => {
          if (Number(index) === Number(statistics.length - 1)) {
            return {
              children: value,
              props: {
                colSpan: 1,
              },
            };
          } else {
            return <span>
               {(
                 (Number(record.system_success_count) === 0) || (Number(record.jinjian_count) === 0)
               )
                 ? '0'
                 : `${((record.system_success_count / record.jinjian_count) * 100).toFixed(2)}%`
               }
              </span>;
          }
        },
      }, {
        title: '操作',
        dataIndex: '_id',
        key: 'action',
        width: 100,
        fixed: 'right',
        render: (value, record) => {
          if (record.date === '合计') {
            return null;
          } else {
            return (
              <Add
                size="small"
                detail={detail}
                record={record}
              />
            );
          }
        },
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={statistics}
        pageSize={100000}
        pagination={false}
        scroll={{ x: 1500 }}
      />
    );
  }

}

export default TableList;
