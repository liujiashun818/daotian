/**
 *@fileName:SelectTable.js
 *@author:mrz
 *@time:下午8:04
 *@disc:
 *
 * inputWidth: 输入框宽度
 * tableWidth: 列表宽度
 * columns: table列
 * dataSource: 数据源
 * showField: 输入框展示值的键
 * defaultValue: 默认值
 * border: 是否显示border  默认为显示
 *
 *
 * onSelect(value): 将选中的数据传到父级
 *
 *
 *
 * Form
 * id: form 表单中id
 * self 传递this
 * label  名字
 * layout 布局
 * rules  规则
 *
 **/
import React from 'react';
import { Input, Table, Form } from 'antd';

import classNames from 'classnames';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
require('./styles.less');

class SelectTableDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      angle: 0,
      isVisible: false,
      showValue: props.defaultValue || '',
    };

    [
      'handleInputClick',
      'handleTableRowClick',
      'handleCancel',
      'eventListener',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentDidMount() {
    document.addEventListener('click', this.eventListener, false);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.eventListener, false);
  }

  handleTableRowClick(value) {
    this.handleCancel();

    const { showField, self, id } = this.props;
    this.setState({ showValue: value[showField] });

    if (!!self) {
      self.props.form.setFieldsValue({ [id]: value[showField] });
    }

    this.props.onSelect(value);
  }

  handleTableClick(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  handleCancel() {
    this.setState({ angle: 0, isVisible: false });
  }

  handleInputClick() {
    const { angle } = this.state;
    this.setState({
      angle: angle > 0 ? 0 : 180,
      isVisible: !(angle > 0),
    });
  }

  eventListener(e) {
    if (e.target.getAttribute('class') === 'ant-input ant-input-lg') {
      return;
    }
    this.setState({ angle: 0, isVisible: false });
  }

  render() {
    const { angle, isVisible, showValue } = this.state;
    const { inputWidth, tableWidth, columns, dataSource, border, self, label, layout, id, defaultValue, rules } = this.props;

    const getFieldDecorator = self && self.props.form.getFieldDecorator;

    const table = classNames({
      'table-content': border,
      'table-content border-none': !border,
    });

    return (
      <div className="select-table">
        <div style={{ position: 'relative', width: inputWidth }}>
          {
            self
              ? (<FormItem label={label} {...layout}>
                {getFieldDecorator(id, {
                  initialValue: defaultValue && String(defaultValue),
                  validateTrigger: 'onBlur',
                  rules,
                })(
                  <Input
                    readOnly
                    size="large"
                    unselectable="on"
                    style={{ width: '100%' }}
                    onClick={this.handleInputClick}
                  />,
                )}

                <div
                  className={table}
                  style={{
                    width: tableWidth,
                    height: isVisible ? '245px' : 0,
                    opacity: isVisible ? 1 : 0,
                  }}
                >
                  <div onClick={this.handleTableClick}>
                    <Table
                      size="small"
                      rowKey={record => record._id}
                      bordered={false}
                      pagination={false}
                      scroll={{ y: 200 }}
                      dataSource={dataSource}
                      columns={columns}
                      onRowClick={this.handleTableRowClick}
                    />
                  </div>
                </div>
              </FormItem>)
              : <Input
                readOnly
                size="large"
                unselectable="on"
                style={{ width: '100%' }}
                onClick={this.handleInputClick}
                value={showValue}
              />
          }
          <span
            className="ant-select-arrow arrow"
            unselectable="unselectable"
            style={{ transform: `rotate(${angle}deg)` }}
          >
            <b />
          </span>
        </div>

        {
          !self && (
            <div
              className={table}
              style={{
                width: tableWidth,
                height: isVisible ? '245px' : 0,
                opacity: isVisible ? 1 : 0,
              }}
            >
              <div onClick={this.handleTableClick}>
                <Table
                  size="small"
                  rowKey={record => record._id}
                  bordered={false}
                  pagination={false}
                  scroll={{ y: 200 }}
                  dataSource={dataSource}
                  columns={columns}
                  onRowClick={this.handleTableRowClick}
                />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

SelectTableDrop.defaultProps = {
  border: true,
  inputWidth: '200px',
  tableWidth: '600px',
  columns: [],
  dataSource: [],
  onSelect: function() {
  },
};

SelectTableDrop.propTypes = {
  border: PropTypes.bool,
  inputWidth: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default SelectTableDrop;