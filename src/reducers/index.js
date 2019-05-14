import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import auth from './auth/authReducer';
import activity from './activity/activityReducer';
// 新车
import intention from './new-car/order/intentionReducer';
import order from './new-car/order/orderReducer';
import orderDetail from './new-car/order/detailReducer';
import productDate from './new-car/product/productReducer';
// 方案管理
import programeData from './new-car/programe/programeReducer';
import statisticData from './new-car/statistic/statisticReducer';

import newCarQa from './new-car/qa/qaReducer';
import newCarBanner from './new-car/banner/bannerReducer';
import newCarResource from './new-car/resource/resourceReducer';
import newCarMaterial from './new-car/material/materialReducer';

import newCarEarningsRecord from './new-car/earnings-record/earningsRecordReducer';

/**
 * ## CombineReducers
 *
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */
const rootReducer = combineReducers({
  routing,

  auth,
  activity,

  intention,
  order,
  orderDetail,

  newCarQa,
  newCarBanner,
  newCarResource,
  newCarEarningsRecord,
  newCarMaterial,

  productDate,
  programeData,
  statisticData,
});

export default rootReducer;
