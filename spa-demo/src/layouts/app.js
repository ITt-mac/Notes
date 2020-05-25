/* global window */
/* global document */
import React from 'react';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';
import pathToRegexp from 'path-to-regexp';
import { connect } from 'dva';
import { Loader, MyLayout } from 'components';
import { BackTop, Layout, Modal } from 'antd';
import { classnames, config } from 'utils';
import { Helmet } from 'react-helmet';
import { withRouter } from 'dva/router';
import Error from '../pages/404';
import 'ant-design-pro/dist/ant-design-pro.css';
import '../themes/index.less';
import './app.less';
import menu from '../common/menu';
const { Content, Footer, Sider } = Layout;
const { Header, Bread, styles } = MyLayout;
const { prefix, openPages, title } = config;

let lastHref;

const App = ({ children, dispatch, app, loading, location }) => {
  const {
    user,
    siderFold,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    permissions,
  } = app;
  let { pathname } = location;
  pathname = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const { iconFontJS, iconFontCSS, logo } = config;
  const current = menu.filter(item =>
    pathToRegexp(item.route || '').exec(pathname)
  );
  const hasPermission = current.length
    ? permissions.visit.includes(current[0].id)
    : false;
  const { href } = window.location;

  if (lastHref !== href) {
    NProgress.start();
    if (!loading.global) {
      NProgress.done();
      lastHref = href;
    }
  }

  const headerProps = {
    menu,
    user,
    location,
    siderFold,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' });
    },
    logout() {
      Modal.confirm({
        title: '确定要退出登录?',
        okType: 'danger',
        onOk() {
          return new Promise(resolve => {
            dispatch({
              type: 'app/logout',
              payload: {
                resolve,
              },
            });
          });
        },
      });
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' });
    },
    changeOpenKeys(openKeys) {
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: openKeys },
      });
    },
  };
  const siderProps = {
    menu,
    location,
    siderFold,
    darkTheme,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/switchTheme' });
    },
    changeOpenKeys(openKeys) {
      window.localStorage.setItem(
        `${prefix}navOpenKeys`,
        JSON.stringify(openKeys)
      );
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: { navOpenKeys: openKeys },
      });
    },
  };

  const breadProps = {
    menu,
    location,
  };
  if (openPages && openPages.includes(pathname)) {
    return (
      <div>
        <Loader fullScreen spinning={loading.effects['app/query']} />
        {children}
      </div>
    );
  }

  return (
    <div>
      <Loader fullScreen spinning={loading.effects['app/query']} />
      <Helmet>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={logo} type="image/x-icon" />
        {iconFontJS && <script src={iconFontJS} />}
        {iconFontCSS && <link rel="stylesheet" href={iconFontCSS} />}
      </Helmet>

      <Layout
        className={classnames({
          [styles.dark]: darkTheme,
          [styles.light]: !darkTheme,
        })}>
        {!isNavbar && (
          <Sider trigger={null} collapsible collapsed={siderFold}>
            {siderProps.menu.length === 0 ? null : (
              <MyLayout.Sider {...siderProps} />
            )}
          </Sider>
        )}
        <Layout
          style={{ height: '100vh', overflow: 'scroll', paddingTop: 56 }}
          id="mainContainer">
          <BackTop target={() => document.getElementById('mainContainer')} />
          <Header {...headerProps} />
          <Content>
            <Bread {...breadProps} />
            {/* {hasPermission ? children : <Error />} */}
            {/* 这里先cancel掉权限显示功能 */}
            {children}
          </Content>
          <Footer>{config.footerText}</Footer>
        </Layout>
      </Layout>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
};

export default withRouter(
  connect(({ app, loading }) => ({ app, loading }))(App)
);
