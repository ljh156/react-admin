import React, { Component } from "react";
import { Button, message } from "antd";
import { getCode } from "../../api/api.js";
let timer = null;
export default class GetCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: props.module,
      username: "",
      isLoading: false,
      code_button_text: "发送验证码",
      code_button_disable: false,
    };
  }
  componentDidMount() {
    console.log(this.state.module);
  }
  // 每当父组件传过来的参数改变时触发
  componentWillReceiveProps({ username }) {
    this.setState({
      username,
    });
  }
  // 点击发送验证码触发
  getValidata = () => {
    // 如果输入的用户名为空，弹出提示，不执行下面代码
    if (!this.state.username) {
      message.warning("请输入用户名");
      return;
    }
    this.setState({
      isLoading: true,
    });
    const data = {
      username: this.state.username,
      module: this.state.module,
    };
    // 发送请求验证码
    getCode(data).then((res) => {
      message.success(`验证码发送成功:${res.data.message}`, 5);
      // 定义倒计时秒数
      let sec = 5;
      timer = setInterval(() => {
        this.setState({
          code_button_text: `${sec}S`,
          isLoading: false,
          code_button_disable: true,
        });
        sec--;
        // 当计时小于0，清楚定时器，并将按钮设置成初始状态
        if (sec <= 0) {
          this.setState({
            code_button_text: "发送验证码",
            code_button_disable: false,
          });
          clearInterval(timer);
          return false;
        }
      }, 1000);
    });
  };
  componentWillUnmount() {
    clearInterval(timer);
  }
  render() {
    return (
      <div>
        <Button
          style={{ width: "100px" }}
          disabled={this.state.code_button_disable}
          onClick={this.getValidata}
          type="primary"
          loading={this.state.isLoading}
        >
          {this.state.code_button_text}
        </Button>
      </div>
    );
  }
}
