import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React from 'react';
import { Cascader, Col, DatePicker, Row, Spin } from 'antd';

import formatter from '../../../utils/DateFormatter';

import TableComponent from './Table';
import Add from './Add';

import { getProvinces, getRegin } from '../../../reducers/new-car/product/productActions';
import {
  getStatisticList,
  setCity,
  setMonth,
} from '../../../reducers/new-car/statistic/statisticActions';

const { MonthPicker } = DatePicker;

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: [],
    };

    [
      'getRegion',
      'handleMonthChange',
      'handleCityChange',
      'handleRegionChange',
    ].map(method => this[method] = this[method].bind(this));
  }

  componentWillMount() {
    const condition = {
      cityId: this.props.city,
      month: this.props.month,
    };
    this.props.actions.getStatisticList(condition);
  }

  componentDidMount() {
    this.props.actions.getProvinces();
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.statisticList !== nextProps.statisticList) &&
      (this.props.statisticList !== '' || [])) {
      const statistics = this.assembleStatistics(nextProps.statisticList);
      this.setState({ statistics });
    }
  }

  handleRegionChange(chooseName, chooseDetail) {
    chooseDetail[1] ? this.handleCityChange(chooseDetail[1].city_id) : this.handleCityChange('');
  }

  handleMonthChange(date, dateString) {
    const condition = {
      cityId: this.props.city,
      month: dateString,
    };
    this.props.actions.setMonth(dateString);
    this.props.actions.getStatisticList(condition);
  }

  handleCityChange(status) {
    const condition = {
      cityId: status,
      month: this.props.month,
    };
    this.props.actions.getStatisticList(condition);
    this.props.actions.setCity(status);
  }

  getRegion(selectedOptions) {
    this.props.actions.getRegin(selectedOptions);
  }

  assembleStatistics(statistics) {
    const newStatistics = statistics;
    if (newStatistics) {
      if (newStatistics.length > 0) {
        let shoujianCount = 0;
        let jinjianCount = 0;
        let neikongtuihuiCount = 0;
        let planChangeCount = 0;
        let systemSuccessCount = 0;
        let systemBohuiCount = 0;
        let systemFuyiCount = 0;
        let jiaocheCount = 0;
        let daihouCount = 0;

        newStatistics.map(item => {
          shoujianCount += Number(item.shoujian_count);
          jinjianCount += Number(item.jinjian_count);
          neikongtuihuiCount += Number(item.neikongtuihui_count);
          planChangeCount += Number(item.plan_change_count);
          systemSuccessCount += Number(item.system_success_count);
          systemBohuiCount += Number(item.system_bohui_count);
          systemFuyiCount += Number(item.system_fuyi_count);
          jiaocheCount += Number(item.jiaoche_count);
          daihouCount += Number(item.daihou_count);
        });

        newStatistics.push({
          _id: 'heji',
          date: '合计',
          shoujian_count: shoujianCount,
          jinjian_count: jinjianCount,
          neikongtuihui_count: neikongtuihuiCount,
          plan_change_count: planChangeCount,
          system_success_count: systemSuccessCount,
          system_bohui_count: systemBohuiCount,
          system_fuyi_count: systemFuyiCount,
          jiaoche_count: jiaocheCount,
          daihou_count: daihouCount,
          jiaoche_lv: ((Number(daihouCount) === 0) || (Number(jinjianCount) === 0))
            ? '0'
            : `${((daihouCount / jinjianCount) * 100).toFixed(2)}%`,
          fangan_lv: ((Number(planChangeCount) === 0) || (Number(shoujianCount) === 0))
            ? '0'
            : `${((planChangeCount / shoujianCount) * 100).toFixed(2)}%`,
          xitong_lv: ((Number(systemSuccessCount) === 0) || (Number(jinjianCount) === 0))
            ? '0'
            : `${((systemSuccessCount / jinjianCount) * 100).toFixed(2)}%`,
        });
      }
    }
    return newStatistics;
  }

  render() {
    const { options, isFetching } = this.props;
    const { statistics } = this.state;

    return (
      <div>
        <Row className='mb20'>
          <div className='pull-left width-240'>
            <label className="label">月份</label>
            <MonthPicker
              defaultValue={formatter.getMomentMonth(new Date())}
              onChange={this.handleMonthChange}
            />
          </div>

          <div className="width-240 pull-left">
            <label className="label ml20">区域</label>
            <Cascader
              placeholder="请选择区域"
              size="large"
              changeOnSelect
              options={options}
              loadData={this.getRegion}
              onChange={this.handleRegionChange}
            />
          </div>

          <Col className="width-140 pull-right">
            <Add size="larger" />
          </Col>

        </Row>

        <div className="mb20 purchase-new">
          <Spin tip="Loading..." spinning={isFetching}>
            <TableComponent statistics={statistics} />
          </Spin>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    options,
  } = state.productDate;
  const {
    isFetching,
    statisticList,
    statisticTotal,
    month,
    city,
  } = state.statisticData;
  return {
    isFetching,
    statisticList,
    statisticTotal,
    options,
    month,
    city,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      getRegin,
      getProvinces,
      getStatisticList,
      setMonth,
      setCity,
    }, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
