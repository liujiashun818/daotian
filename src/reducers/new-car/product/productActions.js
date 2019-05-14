import { message } from 'antd';
import { createAction } from 'redux-actions';

import api from '../../../middleware/api';

const {
  GET_MARKETLISTREQUEST,
  GET_MARKETLISTSUCCESS,

  POST_MARKERTPRODUCTCREATEREQUEST,
  POST_MARKERTPRODUCTCREATERESUCCESS,

  POST_MARKERTPRODUCTRISKREQUEST,
  POST_MARKERTPRODUCTRISKSUCCESS,

  POST_MARKERTDITAMOUNTFIXFINANCEREQUEST,
  POST_MARKERTDITAMOUNTFIXFINANCESUCCESS,

  POST_MARKERTPRODUCT_EDIT_REQUEST,
  POST_MARKERTPRODUCT_EDIT_SUCCESS,

  POST_MARKERTEDITLOANFINANCEREQUEST,
  POST_MARKERTEDITLOANFINANCESUCCESS,

  GET_MARKERTMATERIALLISTDATAREQUEST,
  GET_MARKERTMATERIALLISTDATASUCCESS,

  POST_MARKERTEDITMATERIALREQUESTREQUEST,
  POST_MARKERTEDITMATERIALREQUESTSUCCESS,

  GET_MARKERTPROALLLISTREQUEST,
  GET_MARKERTPROALLLISTSUCCESS,

  POST_MARKERTRESOURCECREATEREQUEST,
  POST_MARKERTRESOURCECREATESUCCESS,

  POST_MARKERTPRODUCTOFFLINEREQUEST,
  POST_MARKERTPRODUCTOFFLINESUCCESS,

  POST_MARKERTPRODUCTONLINEREQUEST,
  POST_MARKERTPRODUCTONLINESUCCESS,

  GET_PRODUCTDETAILREQUEST,
  GET_PRODUCTDETAILSUCCESS,

  SET_CARPRO_PAGE,
  SET_FINANCIALPRO_PAGE,
  GET_NEWCAR_MATERIAL_FAILURE,

  GET_REGIN_REQUEST,
  GET_REGIN_SUCCESS,

  GET_PROVINCES_REQUEST,
  GET_PROVINCES_SUCCESS,
} = require('../../constants').default;

/**
 * ## 获取list详情
 */
export const get_marketListRequest = createAction(GET_MARKETLISTREQUEST);
export const get_marketListSuccess = createAction(GET_MARKETLISTSUCCESS);
export const getMaterialFailure = createAction(GET_NEWCAR_MATERIAL_FAILURE);

export function getResourceList(skip, limit) {
  return dispatch => {
    dispatch(get_marketListRequest());
    api.ajax({ url: api.newCar.getResourceList(skip, limit) }, data => {
      dispatch(get_marketListSuccess(data.res));
    });
  };
}

//
export const post_markertProductCreateRequest = createAction(POST_MARKERTPRODUCTCREATEREQUEST);
export const post_markertProductCreateSuccess = createAction(POST_MARKERTPRODUCTCREATERESUCCESS);

export function createProduct(values, callback) {
  return dispatch => {
    dispatch(post_markertProductCreateRequest());
    api.ajax({
      url: api.newCar.postMarkertProductCreate(values),
      type: 'post',
      data: values,
    }, data => {
      dispatch(post_markertProductCreateSuccess(data.res));
      message.success('创建成功！');
      callback && callback('2');
    }, () => {
      message.error('创建失败！');
    });
  };
}

export const post_markertProductEditRequest = createAction(POST_MARKERTPRODUCT_EDIT_REQUEST);
export const post_markertProductEditSuccess = createAction(POST_MARKERTPRODUCT_EDIT_SUCCESS);

export function editProduct(values) {
  return dispatch => {
    dispatch(post_markertProductEditRequest());
    api.ajax({
      url: api.newCar.postMarketProductEdit(values),
      type: 'post',
      data: values,
    }, data => {
      dispatch(post_markertProductEditSuccess(data.res));
      message.success('成功！');
    }, () => {
      message.error('失败！');
    });
  };
}

//
export const post_markertPeditRiskRequest = createAction(POST_MARKERTPRODUCTRISKREQUEST);
export const post_markertPeditRiskSuccess = createAction(POST_MARKERTPRODUCTRISKSUCCESS);

export function editRisk(data) {
  return dispatch => {
    dispatch(post_markertPeditRiskRequest());
    api.ajax({
      url: api.newCar.postMarkertPeditRisk(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_markertPeditRiskSuccess(data.code));
      message.success('成功！');
      dispatch(getMaterialFailure(data.msg));
    }, () => {
      message.error('失败！');
    });
  };
}

// 融资信息固定首尾付
export const post_markertDitAmountFixFinanceRequest = createAction(POST_MARKERTDITAMOUNTFIXFINANCEREQUEST);
export const post_markertDitAmountFixFinanceSuccess = createAction(POST_MARKERTDITAMOUNTFIXFINANCESUCCESS);

export function amountFixFinance(data) {
  return dispatch => {
    dispatch(post_markertDitAmountFixFinanceRequest());
    api.ajax({
      url: api.newCar.postMarkertDitAmountFixFinance(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_markertDitAmountFixFinanceSuccess(data.res));
      message.success('成功！');
      dispatch(getMaterialFailure(data.msg));
    }, () => {
      message.error('失败！');
    });
  };
}

// 融资信息贷款分期 editLoanFinance
export const post_markertMarkertEditLoanFinanceRequest = createAction(POST_MARKERTEDITLOANFINANCEREQUEST);
export const post_markertMarkertEditLoanFinanceSuccess = createAction(POST_MARKERTEDITLOANFINANCESUCCESS);

export function editLoanFinance(data) {
  return dispatch => {
    dispatch(post_markertMarkertEditLoanFinanceRequest());
    api.ajax({
      url: api.newCar.postMarkertEditLoanFinance(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_markertMarkertEditLoanFinanceSuccess(data.res));
      message.success('成功！');
    }, () => {
      message.error('失败！');
    });
  };
}

// 获取材料设置 getMaterialList
export const get_marketMaterialListDataRequest = createAction(GET_MARKERTMATERIALLISTDATAREQUEST);
export const get_marketMaterialListDataSuccess = createAction(GET_MARKERTMATERIALLISTDATASUCCESS);

export function getMaterialList(skip, limit, resource_id) {
  return dispatch => {
    dispatch(get_marketMaterialListDataRequest());
    api.ajax({
      url: api.newCar.getMaterialList(skip, limit, resource_id),
    }, data => {
      dispatch(get_marketMaterialListDataSuccess(data.res));
      //    dispatch(getMaterialFailure(data.msg));
    });
  };
}

// 材料设置
export const post_market_edit_materialRequest = createAction(POST_MARKERTEDITMATERIALREQUESTREQUEST);
export const post_market_edit_materialSuccess = createAction(POST_MARKERTEDITMATERIALREQUESTSUCCESS);

export function editMaterial(data) {
  return dispatch => {
    dispatch(post_market_edit_materialRequest());
    api.ajax({
      url: api.newCar.postMarketEditMaterial(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_market_edit_materialSuccess(data.res));
      message.success('成功！');
    }, () => {
      message.error('失败！');
    });
  };
}

// 运行中心获取所有的值

export const get_marketProAllListRequest = createAction(GET_MARKERTPROALLLISTREQUEST);
export const get_marketProAllListSuccess = createAction(GET_MARKERTPROALLLISTSUCCESS);

export function getProductList(data) {
  return dispatch => {
    dispatch(get_marketProAllListRequest());
    api.ajax({
      url: api.newCar.getProductList(data),
    }, data => {
      dispatch(get_marketProAllListSuccess(data.res));
      dispatch(getMaterialFailure(data.msg));
    });
  };
}

// 添加资源信息

export const post_markertResourceCreateRequest = createAction(POST_MARKERTRESOURCECREATEREQUEST);
export const post_markertResourceCreateSuccess = createAction(POST_MARKERTRESOURCECREATESUCCESS);

export function createResource(data) {
  return dispatch => {
    dispatch(post_markertResourceCreateRequest());
    api.ajax({
      url: api.newCar.postMarkertResourceCreate(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_markertResourceCreateSuccess(data.res.detail._id));
      dispatch(getResourceList(0, ''));
      message.success('添加成功！');
    }, () => {
      message.error('失败！');
    });
  };
}

// 产品下架

export const post_marketProductOfflineRequest = createAction(POST_MARKERTPRODUCTOFFLINEREQUEST);
export const post_marketProductOfflineSuccess = createAction(POST_MARKERTPRODUCTOFFLINESUCCESS);

export function editProductOffline(data, callback) {
  return dispatch => {
    dispatch(post_marketProductOfflineRequest());
    api.ajax({
      url: api.newCar.postMarketProductOffline(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_marketProductOfflineSuccess(data.res));
      message.success('下架成功');
      callback();
    });
  };
}

// 产品上架

export const post_marketProductOnlineRequest = createAction(POST_MARKERTPRODUCTONLINEREQUEST);
export const post_marketProductOnlineSuccess = createAction(POST_MARKERTPRODUCTONLINESUCCESS);

export function editProductOnline(data, callback) {
  return dispatch => {
    dispatch(post_marketProductOnlineRequest());
    api.ajax({
      url: api.newCar.postMarketProductOnline(data),
      type: 'post',
      data,
    }, data => {
      dispatch(post_marketProductOnlineSuccess(data.res));
      message.success('上架成功！');
      callback();
    });
  };
}

// 产品详情

export const get_productDetailRequest = createAction(GET_PRODUCTDETAILREQUEST);
export const get_productDetailSuccess = createAction(GET_PRODUCTDETAILSUCCESS);

export function getProductDetail(product_id) {
  return dispatch => {
    dispatch(get_productDetailRequest());
    api.ajax({
      url: api.newCar.getProductDetail(product_id),
    }, data => {
      dispatch(get_productDetailSuccess(data.res));
    });
  };
}

/*
* 获取省份
* */
export const getOrderProvincesRequest = createAction(GET_PROVINCES_REQUEST);
export const getOrderProvincesSuccess = createAction(GET_PROVINCES_SUCCESS);

export function getProvinces() {
  return dispatch => {
    dispatch(getOrderProvincesRequest());
    api.ajax({ url: api.admin.system.provinceList() }, data => {
      const provinces = data.res.province_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = false;
        return item;
      });
      dispatch(getOrderProvincesSuccess(provinces));
    });
  };
}

/*
* 获取市县
* */
export const getOrderReginRequest = createAction(GET_REGIN_REQUEST);
export const getOrderReginSuccess = createAction(GET_REGIN_SUCCESS);

export function getRegin(selectedOptions) {
  const targetOption = selectedOptions[selectedOptions.length - 1];
  targetOption.loading = true;
  return dispatch => {
    dispatch(getOrderReginRequest());
    // 获取市
    api.ajax({ url: api.admin.system.cityList(targetOption.name) }, data => {
      targetOption.loading = false;
      targetOption.children = [];
      data.res.city_list.map(item => {
        item.value = item.name;
        item.label = item.name;
        item.isLeaf = true;
        targetOption.children.push(item);
      });
      dispatch(getOrderReginSuccess());
    });
  };
}

/*
* 车型产品page
* */

export function setCarProPage(page) {
  return dispatch => {
    dispatch(createAction(SET_CARPRO_PAGE)(page));
  };
}
/* 金融产品page*/

export function setFinancialProPage(page) {
  return dispatch => {
    dispatch(createAction(SET_FINANCIALPRO_PAGE)(page));
  };
}


