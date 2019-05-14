/**
 * 统计 reducer
 */
const InitialState = require('./statisticInitalState').default;

const {
  GET_STATISTIC_LIST_REQUEST,
  GET_STATISTIC_LIST_SUCCESS,

  SET_MONTH,
  SET_CITY,
} = require('../../constants').default;

const initialState = new InitialState;

export default function activityReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    case GET_STATISTIC_LIST_REQUEST:
      break;
    case GET_STATISTIC_LIST_SUCCESS:
      return state.set('statisticList', action.payload.list).set('isFetching', false).set('statisticTotal',action.payload.total);
    case SET_MONTH:
      return state.set('month', action.payload);
    case SET_CITY:
      return state.set('city', action.payload);
  }
  return state;
}
