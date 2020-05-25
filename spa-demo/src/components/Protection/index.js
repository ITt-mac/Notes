import React from "react";
import ReactDOM from "react-dom";
import {request} from "utils";
import Ui from "./Ui";

class Protection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      res: {},
      cb: null,
      visible: false,
      protectionMinute: 25,
    };
  }

  showModel = (time, res, cb) => {
    this.setState({
      res,
      cb,
      visible: true,
      protectionMinute: time,
    });
  };
  hideModel = () => {
    this.setState({
      res: {},
      visible: false,
      confirmLoading: false,
    });
    this.state.cb({
      data: {
        success: false,
        Message: "操作被取消",
      },
    });
  };
  ok = result => {
    let {data, method, url} = this.state.res.config;
    // data = data.replace(/\%5B/g, "[").replace(/\%5D/g, "]").replace(/\%40/g, '@');
    data = decodeURIComponent(data);
    const that = this;
    that.setState({
      confirmLoading: true,
    });
    if (method == "get") {
      url = url + `?${data}`;
      data = {};
    } else {
      const arr = data.split("&");
      const result = {};
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i].split("=");
        result[item[0]] = item[1];
      }
      data = result;
    }
    request({
      url: url,
      method,
      onlyValidation: true,
      data: {
        ...data,
        ...result,
      },
    }).then(res => {
      const {data} = res;
      if (data && data.Code === "Success") {
        that.setState({
          visible: false,
          confirmLoading: false,
        });
        that.state.cb(res);
      } else {
        that.setState({
          confirmLoading: false,
        });
      }
    });
  };

  render() {
    return (
      <Ui
        visible={this.state.visible}
        hideVisible={this.hideModel}
        ok={this.ok}
        confirmLoading={this.state.confirmLoading}
        protectionMinute={this.state.protectionMinute}
      />
    );
  }
}

function createProtection() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  const ref = React.createRef();
  ReactDOM.render(<Protection ref={ref}/>, div);
  return {
    showModel(time, res, cb) {
      return ref.current.showModel(time, res, cb);
    },
    hideModel() {
      return ref.current.hideModel();
    },
    removeModel() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
    },
  };
}

export default createProtection();
