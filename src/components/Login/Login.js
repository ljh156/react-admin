import React, { Component } from "react";
import { message, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";
import { login } from "../../api/api.js";
import GetCode from "./GetCode";
import { Link } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: "login",
      username: "",
      isLoading: false,
      code_button_text: "发送验证码",
      code_button_disable: false,
    };
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { username, password, code } = values;
    // 登陆成功将token存入sessionstorage
    login({ username, password, code }).then((res) => {
      console.log(res);
      const { data } = res;
      //判断用户名密码是否正确
      if (data.resCode === 0) {
        sessionStorage.setItem("token", data.data.token);
        sessionStorage.setItem("username", data.data.username);
        document.cookie = `adminToken=${data.data.token}`;
        document.cookie = `username=${data.data.username}`;
        this.props.history.push("/home");
      } else {
        message.error(data.message);
      }
    });
  };

  // 绑定用户名输入框数据
  inputChange = (e) => {
    console.log(e.target.value);
    this.setState({
      username: e.target.value,
    });
  };
  render() {
    return (
      <div className="login-wrapper">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              { required: true, message: "用户名不能为空!" },
              {
                type: "email",
                message: "邮箱格式不正确",
              },
            ]}
          >
            <Input
              value={this.state.username}
              onChange={this.inputChange}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "密码不能为空" },
              // {
              //   min: 6,
              //   message: "密码不能小于6位",
              // },
              // 正则验证
              // {
              //   pattern: //,
              //   message: "请输入字母加数字6到20位",
              // },
              // 自定义验证规则， getFieldValue获取表单的值，传入表单项的name
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  console.log(value);
                  if (value.length < 6) {
                    return Promise.reject("密码不能小于6位");
                  }

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item name="code">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="验证码"
              style={{ width: "200px" }}
            />
          </Form.Item>
          <GetCode username={this.state.username} module={this.state.module} />
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              登录
            </Button>
            Or <Link to="/register">register now!</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Login;
