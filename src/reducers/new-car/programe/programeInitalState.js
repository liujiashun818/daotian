const { Record } = require('immutable');

const InitialState = Record({
  brandsData: [],
  seriesByBrandData: [],
  typesBySeriesData: [],
  createLoanPlanResponse: [],
  createFixPlanResponse: [],
  createAutoTypeResponse: [],
  planData: [],
  planEditHotResponse: [],
  postMarketPlanOfflineRes: [],
  postMarketPlanOnlineRes: [],
  planDetailData: [],
  editFixPlanResponse: [],
  editLoanPlanResponse: [],
  productListData: [],

  vehicleChemePage: 1,
  financialProgramPage: 1,
  productDetail: {},
  isFetching: true,

  options: [],
});

export default InitialState;

