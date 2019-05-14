import DateFormatter from '../../../utils/DateFormatter';

const { Record } = require('immutable');

const InitialState = Record({
  isFetching: false,
  page: 1,
  list: [],
  total: 0,
  error: null,

  searchKey: '',
  province: '',
  cityId: '',
  country: '',
  companyId: '0',
  startDate: DateFormatter.day(DateFormatter.getLatestMonthStart()),
  endDate: DateFormatter.day(new Date()),
  productId: '0',
  type: '0',
  status: '-2',
  options: [],
  productList: [],
  companyList: [],
});

export default InitialState;

