import DateFormatter from '../../../utils/DateFormatter';


const { Record } = require('immutable');

const InitialState = Record({
  isFetching: true,
  page: 1,
  statisticList:[],
  statisticTotal:0,
  month:DateFormatter.month(new Date()),
  city:'',

});
export default InitialState;

