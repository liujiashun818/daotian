const { Record } = require('immutable');

const InitialState = Record({
  isFetching: true,
  page: 1,

  resourceList: [],
  createProductResponse: '',
  editRiskResponse: [],
  amountFixFinanceResponse: [],
  materialData: [],
  editMaterialResponse: [],
  productListData: [],
  resourceCreateResponse: '',
  financingResponse: [],
  offlineResponse: [],
  onlineResponse: [],
  productDetail: [],

  productInfo: {},

  carProPage: 1,
  financialProPage: 1,

  options: [],
});
export default InitialState;

