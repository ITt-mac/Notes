import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Loader from '../Loader'
import styles from './Page.less'

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }
  componentWillMount() {
    this.startErrorLog();
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });

  }

  startErrorLog=()=>{
    window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
      console.log('errorMessage(异常信息): ' + errorMessage); // 异常信息
      console.log('scriptURI(异常文件路径): ' + scriptURI); // 异常文件路径
      console.log('error(异常堆栈信息): ' + error); // 异常堆栈信息
    };
  }

  render () {
    const {
      className, children, loading = false, inner = false,
    } = this.props
    const loadingStyle = {
      height: 'calc(100vh - 184px)',
      overflow: 'hidden',
    }

    if(this.state.hasError) {
      return (
        <>
          <h1>数据出错了！</h1>
          <p>{this.state.error.toString()}</p>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </>
      );
    }
    return (
      <div
        className={classnames(className, {
          [styles.contentInner]: inner,
        })}
        style={loading ? loadingStyle : null}
      >
        {loading ? <Loader spinning /> : ''}
        {children}
      </div>
    )
  }
}

Page.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool,
  inner: PropTypes.bool,
}
