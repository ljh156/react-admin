import React, { Component } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./index.css";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
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
          <Form.Item name="验证码">
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="text"
              placeholder="验证码"
              style={{ width: "200px" }}
            />
          </Form.Item>
          <Button type="primary">发送验证码</Button>
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
            Or <a href="">register now!</a>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default Index;
