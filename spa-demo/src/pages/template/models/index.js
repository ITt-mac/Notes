/* global window */
import modelExtend from 'dva-model-extend';
import { config, setDefaultPayload } from 'utils';

import { query, remove, create } from '../services/index';
import { pageModel } from 'utils/model';
import { message } from 'antd';
const { prefix } = config;

export default modelExtend(pageModel, {
  namespace: 'templatemanage',
  state: {
    currentItem: {},
    modalVisible: false,
    modalType: 'create',
    selectedRowKeys: [],
    contentLength: 0,
    isMotion: window.localStorage.getItem(`${prefix}userIsMotion`) === 'true',
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(location => {
        if (location.pathname === '/template') {
          const payload = setDefaultPayload(location);
          dispatch({
            type: 'query',
            payload,
          });
        }
      });
    },
  },

  effects: {
    *query({ payload = {} }, { call, put }) {
      const data = yield call(query, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            list: data.Data.data,
            // pagination: {
            //   current: Number(payload.page) || 1,
            //   list_rows: Number(payload.list_rows) || 10,
            //   total: data.Data.total,
            // },
            permission: data.Data.permission,
          },
        });
      }
    },
    *create({ payload }, { call, put }) {
      const data = yield call(create, payload);
      if (data.success) {
        message.success(data.Message || '操作成功!');
        yield put({
          type: 'query',
          payload: {},
        });
        yield put({
          type: 'hideModal',
          payload: {},
        });
      }
    },
    *delete({ payload }, { call, put, select }) {
      const data = yield call(remove, { id: payload.id });
      const { selectedRowKeys } = yield select(_ => _.templatemanage);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            selectedRowKeys: selectedRowKeys.filter(_ => _ !== payload.id),
          },
        });
      }
    },
  },

  reducers: {
    showModal(state, { payload }) {
      return { ...state, ...payload, modalVisible: true };
    },

    hideModal(state) {
      return { ...state, modalVisible: false };
    },
  },
});
