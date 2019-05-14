import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';
/**
 * ## States
 * defines initial state
 *
 */
import authInitialState from './reducers/auth/authInitialState';
import activityInitialState from './reducers/activity/activityInitialState';
// 新车
import intentionInitialState from './reducers/new-car/order/intentionInitialState';
import orderInitialState from './reducers/new-car/order/orderInitialState';
import orderDetailInitailState from './reducers/new-car/order/detailInitialState';

import productDateInitialState from './reducers/new-car/product/productInitalState';
import programeDataInitialState from './reducers/new-car/programe/programeInitalState';
import statisticDateInitialState from './reducers/new-car/statistic/statisticInitalState';

import qaInitailState from './reducers/new-car/qa/qaInitialState';
import newCarBannerInitailState from './reducers/new-car/banner/bannerInitialState';
import newCarResourceInitailState from './reducers/new-car/resource/resourceInitialState';
import newCarEarningsRecordInitailState from './reducers/new-car/earnings-record/earningsRecordInitialState';
import newCarMaterialInitailState from './reducers/new-car/material/materialInitialState';

require('./config/userstatus');
/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in App
 * @returns {Object} object with 4 keys
 */
function getInitialState() {
  const _initState = {
    auth: new authInitialState,
    activity: new activityInitialState,

    intention: new intentionInitialState,
    order: new orderInitialState,
    orderDetail: new orderDetailInitailState,

    newCarQa: new qaInitailState,
    newCarBanner: new newCarBannerInitailState,
    newCarResource: new newCarResourceInitailState,
    newCarEarningsRecord: new newCarEarningsRecordInitailState,
    newCarMaterial: new newCarMaterialInitailState,

    productDate: new productDateInitialState,
    programeData: new programeDataInitialState,
    statisticData: new statisticDateInitialState,
  };
  return _initState;
}

const store = configureStore(getInitialState());

render(
  <Root store={store} />,
  document.getElementById('app'),
);
if (module.hot) {
  module.hot.accept();
}
