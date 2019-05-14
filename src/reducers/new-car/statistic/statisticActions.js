import { message } from 'antd';
import { createAction } from 'redux-actions';
import  statisticData  from './statisticReducer';

import api from '../../../middleware/api';

const {
  GET_STATISTIC_LIST_REQUEST,
  GET_STATISTIC_LIST_SUCCESS,

  EDIT_STATISTIC_REQUEST,
  EDIT_STATISTIC_SUCCESS,

  CREATE_STATISTIC_REQUEST,
  CREATE_STATISTIC_SUCCESS,

  SET_MONTH,
  SET_CITY,
} = require('../../constants').default;

/**
 * ## 统计列表
 */
const getStatisticListRequest = createAction(GET_STATISTIC_LIST_REQUEST);
const getStatisticListSuccess = createAction(GET_STATISTIC_LIST_SUCCESS);

// export const getStatisticListFailure = createAction(GET_NEWCAR_MATERIAL_FAILURE);
export function getStatisticList(condition) {
  return dispatch => {
    api.ajax({ url: api.newCar.getStatisticList(condition) }, data => {
      dispatch(getStatisticListSuccess(data.res));
    });
  };
}

const editStatisticRequest = createAction(EDIT_STATISTIC_REQUEST);
const editStatisticSuccess = createAction(EDIT_STATISTIC_SUCCESS);

export function editStatistic(values, callback) {
  return dispatch => {
    api.ajax({
      url: api.newCar.editStatistics(values),
      type: 'post',
      data: values,
    }, data => {
      callback && callback();
      message.success('编辑成功！');
    }, () => {
      message.error('编辑失败！');
    });
  };
}

const createStatisticRequest = createAction(CREATE_STATISTIC_REQUEST);
const createStatisticSuccess = createAction(CREATE_STATISTIC_SUCCESS);

export function createStatistic(data, callback) {
  return dispatch => {
    api.ajax({
      url: api.newCar.createStatistics(data),
      type: 'post',
      data: data,
    }, data => {
      console.log(data);
      message.success('创建成功！');
      callback && callback();
    }, () => {
      message.error('创建失败！');
    });
  };
}

const setMonthSuccess = createAction(SET_MONTH);
const setCitySuccess = createAction(SET_CITY);

export function setMonth(status) {
  return dispatch => {
    dispatch(setMonthSuccess(status));
  };
}

export function setCity(status) {
  return dispatch => {
    dispatch(setCitySuccess(status));
  };
}
