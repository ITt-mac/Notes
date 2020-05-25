/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router';
import pathToRegexp from 'path-to-regexp';
import config from 'config';
import { removeItem, setItem, hcf_TOKEN, getPathArray } from '../utils';
import { query, sort } from 'services/app';
import queryString from 'query-string';
import { message } from 'antd';

const { prefix } = config;

export default {
  namespace: 'app',
  state: {
    user: {
      message:[]
    },
    permissions: {
      visit: [],
    },
    //这个是侧边栏菜单的数据
    menu: [
      // {
      //   id: 1,
      //   icon: 'laptop',
      //   name: 'Dashboard',
      //   router: '/dashboard',
      // },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys:
      JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        dispatch({
          type: 'setOpenkeys',
          payload: {
            pathname: location.pathname,
          },
        });
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        });
      });
    },
    setup({ dispatch, history }) {
      if (history.location.pathname === '/login') {
        return false;
      }
      //这里先取消登录校验
      // dispatch({ type: 'query' });
      let tid;
      window.onresize = () => {
        clearTimeout(tid);
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' });
        }, 300);
      };
    },
  },
  effects: {
    *query({ payload }, { call, put, select }) {
      const { success, Data } = yield call(query, payload);
      const { locationPathname } = yield select(_ => _.app);
      if (success && Data) {
        yield put({
          type: 'setOpenkeys',
          payload: {
            pathname: locationPathname,
          },
        });
      } else if (
        config.openPages &&
        config.openPages.indexOf(locationPathname) < 0
      ) {
        //这里是对登录进行判断，如果没登录则跳至登录页
        yield put(
          routerRedux.push({
            pathname: '/login',
            search: queryString.stringify({
              from: locationPathname,
            }),
          })
        );
      }
    },

    *setOpenkeys({ payload }, { put, select }) {
      const { pathname } = payload;
      const { menu } = yield select(_ => _.app);

      if (menu.length !== 1) {
        let currentMenu = {};
        for (let item of menu) {
          if (item.route && pathToRegexp(item.route).exec(pathname)) {
            currentMenu = item;
            break;
          }
        }
        if (currentMenu.mpid === -1) {
          return false;
        }
        const defaultSelectedKeys = getPathArray(
          menu,
          currentMenu,
          'mpid',
          'id'
        );
        const len = defaultSelectedKeys.length;
        const parentIds = defaultSelectedKeys.filter((item, index) => {
          if (index + 1 < len) {
            return true;
          }
          return false;
        });
        yield put({ type: 'updateState', payload: { navOpenKeys: parentIds } });
      }
    },

    *logout({ payload }, { put, select }) {
      const { resolve } = payload;
      const { locationPathname } = yield select(_ => _.app);
      message.success('退出成功!');
      removeItem(hcf_TOKEN);
      yield put(
        routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        })
      );
      !!resolve && resolve();
    },

    *changeNavbar(action, { put, select }) {
      const { app } = yield select(_ => _);
      const isNavbar = document.body.clientWidth < 769;
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar });
      }
    },

    *sort({ payload = {} }, { call }) {
      const data = yield call(sort, payload);
      if (data.success) {
        message.success(data.Message || '排序成功!');
      }
      return data;
    },
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },

    switchSider(state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold);
      return {
        ...state,
        siderFold: !state.siderFold,
      };
    },

    switchTheme(state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme);
      return {
        ...state,
        darkTheme: !state.darkTheme,
      };
    },

    switchMenuPopver(state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      };
    },

    handleNavbar(state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      };
    },

    handleNavOpenKeys(state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      };
    },
  },
};
