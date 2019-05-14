/**
 *@fileName:SearchTableDrop.js
 *@author:mrz
 *@time:下午8:04
 *@disc:
 *
 * inputWidth: 输入框宽度
 * tableWidth: 列表宽度
 * columns: table列
 * dataSource: 数据源
 * value: 输入框展示的值
 * showField: 输入框展示值的键
 * defaultValue: 默认值
 * border: 是否显示border  默认为显示
 *
 * onSelect(value): 将选中的数据传到父级
 * onChange(value): 输入框变化将值传出
 **/
import React from 'react';
import { Input, Table } from 'antd';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const Search = Input.Search;
require('./styles.less');

class SearchTableDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      showValue: props.defaultValue || '',
    };

    [
      'handleTableRowClick',
      'handleCancel',
      'eventListener',
      'handleInputChange',
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

    const { showField } = this.props;
    this.setState({ showValue: value[showField] });
    this.props.onSelect(value);
  }

  handleTableClick(e) {
    e.nativeEvent.stopImmediatePropagation();
  }

  handleInputChange(e) {
    const { value } = e.target;
    this.setState({ isVisible: true, showValue: value });
    this.props.onChange(value);
  }

  handleCancel() {
    this.setState({ isVisible: false });
  }

  eventListener(e) {
    if (e.target.getAttribute('class') === 'ant-input ant-input-lg') {
      return;
    }
    this.setState({ angle: 0, isVisible: false });
  }

  render() {
    const { isVisible, showValue } = this.state;
    const { inputWidth, tableWidth, columns, dataSource, border } = this.props;

    const table = classNames({
      'table-content': border,
      'table-content border-none': !border,
    });

    return (
      <div className="search-table">
        <div style={{ position: 'relative', width: inputWidth }}>
          <Search
            size="large"
            value={showValue}
            style={{ width: '100%' }}
            onChange={this.handleInputChange}
          />
        </div>

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
              bordered={false}
              pagination={false}
              scroll={{ y: 200 }}
              dataSource={dataSource}
              columns={columns}
              rowKey={record => record._id}
              onRowClick={this.handleTableRowClick}
            />
          </div>
        </div>
      </div>
    );
  }
}

SearchTableDrop.defaultProps = {
  border: true,
  inputWidth: '200px',
  tableWidth: '600px',
  columns: [],
  dataSource: [],
  onSelect: function() {
  },
  onChange: function() {
  },
};

SearchTableDrop.propTypes = {
  border: PropTypes.bool,
  inputWidth: PropTypes.string,
  tableWidth: PropTypes.string,
  columns: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchTableDrop;