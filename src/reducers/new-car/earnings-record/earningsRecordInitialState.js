import DateFormatter from '../../../utils/DateFormatter';

const { Record } = require('immutable');

const InitialState = Record({
  isFetching: false,
  page: 1,
  list: [],
  total: 0,
  error: null,

  startDate: DateFormatter.day(DateFormatter.getLatestMonthStart()),
  endDate: DateFormatter.day(new Date()),
  province: '',
  cityId: '',
  country: '',
  options: [],
  resourceList: [],
  resourceId: '',
});

export default InitialState;

