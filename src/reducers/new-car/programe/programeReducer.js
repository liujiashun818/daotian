/**
 * order detail reducer
 */
const InitialState = require('./programeInitalState').default;

const {
  GET_BRANDSREQUESTREQUEST,
  GET_BRANDSREQUESTSUCCESS,

  GET_SERISEBYBRANDREQUEST,
  GET_SERISEBYBRANDSUCCESS,

  GET_TYPESBYSERIESREQUEST,
  GET_TYPESBYSERIESSUCCESS,

  POST_CREATELOANPLANREQUEST,
  POST_CREATELOANPLANSUCCESS,

  POST_CREATEAMOUNTFIXPLANREQUEST,
  POST_CREATEAMOUNTFIXPLANSUCCESS,

  POST_CREATEAUTOTYPEREQUEST,
  POST_CREATEAUTOTYPESUCCESS,

  GET_MARKERTPLANALLLISTREQUEST,
  GET_MARKERTPLANALLLISTSUCCESS,

  POST_MARKETPLANEDITHOTREQUEST,
  POST_MARKETPLANEDITHOTSUCCESS,

  POST_MARKETPLANOFFLINEREQUEST,
  POST_MARKETPLANOFFLINESUCCESS,

  POST_MARKETPLANONLINEREQUEST,
  POST_MARKETPLANONLINESUCCESS,

  GET_PLANDETAILREQUEST,
  GET_PLANDETAILSUCCESS,

  POST_EDITAMOUNTFIXPLANREQUEST,
  POST_EDITAMOUNTFIXPLANSUCCESS,

  POST_EDITLOANPLANREQUEST,
  POST_EDITLOANPLANSUCCESS,

  SET_VEHICLESCHEME_PAGE,
  SET_FINANCIALPROGRAM_PAGE,

  GET_PRODUCTLISTALLREQUEST,
  GET_PRODUCTLISTALLSUCCESS,

  GET_PRODUCT_DETAIL_REQUEST,
  GET_PRODUCT_DETAIL_SUCCESS,

  GET_PROGRAME_REGIN_REQUEST,
  GET_PROGRAME_REGIN_SUCCESS,

  GET_PROGRAME_PROVINCES_REQUEST,
  GET_PROGRAME_PROVINCES_SUCCESS,
} = require('../../constants').default;

const initialState = new InitialState;

export default function activityReducer(state = initialState, action) {
  if (!(state instanceof InitialState)) return initialState.mergeDeep(state);
  switch (action.type) {
    case GET_BRANDSREQUESTREQUEST:
      break;
    case GET_BRANDSREQUESTSUCCESS:
      return state.set('brandsData', action.payload);
    case GET_SERISEBYBRANDREQUEST:
      break;
    case GET_SERISEBYBRANDSUCCESS:
      return state.set('seriesByBrandData', action.payload);
    case GET_TYPESBYSERIESREQUEST:
      break;
    case GET_TYPESBYSERIESSUCCESS:
      return state.set('typesBySeriesData', action.payload);
    case POST_CREATELOANPLANREQUEST:
      break;
    case POST_CREATELOANPLANSUCCESS:
      return state.set('createLoanPlanResponse', action.payload);
    case POST_CREATEAMOUNTFIXPLANREQUEST:
      break;
    case POST_CREATEAMOUNTFIXPLANSUCCESS:
      return state.set('createFixPlanResponse', action.payload);
    case POST_CREATEAUTOTYPEREQUEST:
      break;
    case POST_CREATEAUTOTYPESUCCESS:
      return state.set('createAutoTypeResponse', action.payload);
    case GET_MARKERTPLANALLLISTREQUEST:
      break;
    case GET_MARKERTPLANALLLISTSUCCESS:
      return state.set('planData', action.payload).set('isFetching', false);
    case POST_MARKETPLANEDITHOTREQUEST:
      break;
    case POST_MARKETPLANEDITHOTSUCCESS:
      return state.set('planEditHotResponse', action.payload);

    case POST_MARKETPLANOFFLINEREQUEST:
      break;
    case POST_MARKETPLANOFFLINESUCCESS:
      return state.set('postMarketPlanOfflineRes', action.payload);
    case POST_MARKETPLANONLINEREQUEST:
      break;
    case POST_MARKETPLANONLINESUCCESS:
      return state.set('postMarketPlanOnlineRes', action.payload);
    case GET_PLANDETAILREQUEST:
      break;
    case GET_PLANDETAILSUCCESS:
      return state.set('planDetailData', action.payload);
    case POST_EDITAMOUNTFIXPLANREQUEST:
      break;
    case POST_EDITAMOUNTFIXPLANSUCCESS:
      return state.set('editFixPlanResponse', action.payload);
    case POST_EDITLOANPLANREQUEST:
      break;
    case POST_EDITLOANPLANSUCCESS:
      return state.set('editLoanPlanResponse', action.payload);

    case SET_VEHICLESCHEME_PAGE:
      return state.set('vehicleChemePage', action.payload);
    case SET_FINANCIALPROGRAM_PAGE:
      return state.set('financialProgramPage', action.payload);

    case GET_PRODUCTLISTALLREQUEST:
      break;
    case GET_PRODUCTLISTALLSUCCESS:
      return state.set('productListData', action.payload);
    case GET_PRODUCT_DETAIL_REQUEST:
      break;
    case GET_PRODUCT_DETAIL_SUCCESS:
      return state.set('productDetail', action.payload);

    case GET_PROGRAME_REGIN_REQUEST:
      break;
    case GET_PROGRAME_REGIN_SUCCESS:
      return state.set('options', [...state.options]);

    case GET_PROGRAME_PROVINCES_REQUEST:
      break;
    case GET_PROGRAME_PROVINCES_SUCCESS:
      return state.set('options', action.payload);
  }
  return state;
}
