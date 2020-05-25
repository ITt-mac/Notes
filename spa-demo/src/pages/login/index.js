import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Button, Row, Form, Input, Icon, Col } from 'antd';
import { config } from 'utils';
import styles from './index.less';

const FormItem = Form.Item;

const Login = ({
  login,
  dispatch,
  form: { getFieldDecorator, validateFieldsAndScroll },
  loading
}) => {
  function handleOk() {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return;
      }
      dispatch({ type: 'login/login', payload: values });
    });
  }

  const { verifyImg } = login;
  const BtnLoading = loading.effects['login/login'];
  const changeImg = () => {
    dispatch({ type: 'login/changeVerify' });
  };

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img alt="logo" src={config.logo} />
        <span>{config.name}</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('mobile', {
            rules: [
              {
                required: true,
                message: '会员名不能为空',
              },
            ],
          })(
            <Input
              onPressEnter={handleOk}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="会员名"
            />
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码不能为空',
              },
            ],
          })(
            <Input
              type="password"
              onPressEnter={handleOk}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="密码"
            />
          )}
        </FormItem>
        {/* <FormItem>
          <Row>
            <Col span={14}>
              {getFieldDecorator('vcode', {
                rules: [{ required: true, message: '验证码不能为空' }],
              })(<Input onPressEnter={handleOk} placeholder="请输入验证码" />)}
            </Col>
            <Col span={10}>
              <img
                src={verifyImg}
                className={styles.verify}
                onClick={changeImg}
              />
            </Col>
          </Row>
        </FormItem> */}
        <Row>
          <Button type="primary" onClick={handleOk} loading={BtnLoading }>
            登录
          </Button>
        </Row>
      </form>
    </div>
  );
};

Login.propTypes = {
  form: PropTypes.object,
  dispatch: PropTypes.func,
  login: PropTypes.object,
};

export default connect(({ login,loading }) => ({ login,loading }))(Form.create()(Login));
