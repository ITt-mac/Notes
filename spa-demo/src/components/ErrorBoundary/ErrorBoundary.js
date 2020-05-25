import React from 'react';

class ErrorBoundary extends React.Component {
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
    // const isNewError = (error.toString() !== this.state.error.toString());
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });

  }

  startErrorLog=()=>{
    window.onerror = function (errorMessage, scriptURI, lineNo, columnNo, error) {
      console.log('errorMessage: ' + errorMessage); // 异常信息
      console.log('scriptURI: ' + scriptURI); // 异常文件路径
      console.log('lineNo: ' + lineNo); // 异常行号
      console.log('columnNo: ' + columnNo); // 异常列号
      console.log('error: ' + error); // 异常堆栈信息
    };
  }

  render() {
    if(this.state.errorInfo) {
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
    return this.props.children;
  }
}

export default ErrorBoundary;
