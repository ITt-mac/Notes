import React from 'react';
import { Modal, Spin, Tag } from 'antd';
import { config, request } from 'utils';
import styles from './index.less';

export default class AdminInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoVisible: false,
      loading: true,
      adminData: {
        create_time: '',
        email: '',
        id: '',
        mobile: '',
        role: [],
        status: 1,
      },
    };
  }
  showUserInfo = () => {
    if (this.state.adminData.id) {
      this.setState({
        infoVisible: true,
      });
      return false;
    }
    const id = this.props.id;
    const that = this;
    request({
      url: `${config.APIV1}/admin_detail`,
      data: {
        id,
      },
    }).then(res => {
      if (res && res.success) {
        const data = res.Data;
        that.setState({
          loading: false,
          adminData: {
            ...data,
          },
        });
      }
    });
    this.setState({
      infoVisible: true,
    });
  };
  hideUserInfo = () => {
    this.setState({
      infoVisible: false,
    });
  };

  statusMap = status => {
    if (status) {
      return <Tag color="#87d068">正常</Tag>;
    }
    return <Tag color="#f50">禁用</Tag>;
  };
  renderRoles = roles => {
    let arr = [];
    if (roles.length > 0) {
      roles.forEach(item => {
        arr.push(item.name);
      });
    } else {
      arr[0] = '-';
    }

    return arr.join('、');
  };

  render() {
    return (
      <div className={styles.main}>
        <span onClick={this.showUserInfo}>
          {this.props.children || this.props.id}
        </span>
        {this.state.infoVisible ? (
          <Modal
            title="管理员信息"
            maskClosable={false}
            visible={this.state.infoVisible}
            onCancel={this.hideUserInfo}
            footer={null}>
            <Spin spinning={this.state.loading}>
              <div className={styles.moreInfo}>
                <span>ID</span>
                <span>{this.state.adminData.id}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>姓名</span>
                <span>{this.state.adminData.name}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>角色</span>
                <span>{this.renderRoles(this.state.adminData.role)}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>手机</span>
                <span>{this.state.adminData.mobile}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>邮箱</span>
                <span>{this.state.adminData.email}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>状态</span>
                <span>{this.statusMap(this.state.adminData.status)}</span>
              </div>
              <div className={styles.moreInfo}>
                <span>最后登录时间</span>
                <span>{this.state.adminData.modified_time}</span>
              </div>
            </Spin>
          </Modal>
        ) : null}
      </div>
    );
  }
}
