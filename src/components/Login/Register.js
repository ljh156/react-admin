import React, { Component } from "react";
import { message, Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";
import { register } from "../../api/api.js";
import GetCode from "./GetCode";
import { Link } from "react-router-dom";
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      module: "register",
      username: "",
      password: "",
      code: "",
    };
  }
  onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { username, password, code } = values;

    // 注册成功后，跳转到登录页
    register({ username, password, code }).then((res) => {
      message.success(res.data.message, 3);
      this.props.history.push("/");
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
      <div>
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
                {
                  min: 6,
                  message: "密码不能小于6位",
                },
                // 正则验证
                // {
                //   pattern: //,
                //   message: "请输入字母加数字6到20位",
                // },
                // 自定义验证规则， getFieldValue获取表单的值，传入表单项的name
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    console.log(value, getFieldValue("confirmPassword"));
                    let password_value = getFieldValue("confirmPassword");
                    //  如果下面的确认框有值，并且两个不一致就提示
                    if (password_value && value !== password_value) {
                      return Promise.reject("两次密码不一致");
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
            <Form.Item
              name="confirmPassword"
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
                    // getFieldValue获取指定名称的表单的值
                    console.log(getFieldValue("password"));
                    if (getFieldValue("password") !== value) {
                      return Promise.reject("两次密码不一致");
                    }

                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="再次输入密码"
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

            <Form.Item>
              <GetCode
                username={this.state.username}
                module={this.state.module}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                注册
              </Button>
              Or <Link to="/">login now!</Link>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
