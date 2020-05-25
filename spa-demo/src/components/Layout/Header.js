import React from 'react'
import PropTypes from 'prop-types'
import Link from 'umi/link'
import { Menu, Icon, Popover, Layout, Avatar, Badge } from 'antd'
import classnames from 'classnames'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu

const Header = ({
  user, logout, switchSider, siderFold, isNavbar, menuPopoverVisible, location, switchMenuPopover, navOpenKeys, changeOpenKeys, menu,
}) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: false,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }

  let count=user.message.length
  return (
    <Layout.Header className={`${styles.header} ${siderFold ? styles.NavbarHeader : ''}`}>
      {isNavbar
        ? <Popover placement="bottomLeft" onVisibleChange={switchMenuPopover} visible={menuPopoverVisible} overlayClassName={styles.popovermenu} trigger="click" content={<Menus {...menusProps} />}>
          <div className={styles.button}>
            <Icon type="bars" />
          </div>
        </Popover>
        : <div
          className={styles.button}
          onClick={switchSider}
        >
          <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
        </div>}
      <div className={styles.rightWarpper}>
        {/*<div className={styles.button}>*/}
          {/*<Badge dot>*/}
          {/*<Icon type="mail" />*/}
          {/*</Badge>*/}
        {/*</div>*/}
        <Menu mode="horizontal">
          <SubMenu
            title={<Badge count={count} dot>
              <Icon type="mail" />
            </Badge>}
          >

            <Menu.Item key="none">暂无消息</Menu.Item>
          </SubMenu>
        </Menu>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<Link to="/me" style={{color: '#333'}}>
              <Icon type="user" />
              {user.name}
            </Link>}
          >
            <Menu.Item key="logout">退出登录</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
