import React, { Component } from "react";
import { Form, Input, Button, Switch, InputNumber, message } from "antd";
import { depAdd, depDetail, depEdit } from "../../../api/api";
const { TextArea } = Input;
class departmentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = (values) => {
    if (this.props.location.state.id) {
      let data = { id: this.state.id, ...values };

      console.log(data);

      depEdit(data).then((res) => {
        console.log("====================================");
        console.log(res);
        console.log("====================================");
        if (res.data.resCode === 0) {
          message.success(res.data.message);
          this.refs.form.resetFields();
        }
      });
    } else {
      console.log("====================================");
      console.log(1);
      console.log("====================================");
      depAdd(values).then((res) => {
        const { data } = res;
        message.success(data.message, 3);
        this.refs.form.resetFields();
      });
    }
  };
  onSwitchChange = (value) => {
    console.log(this.refs);
  };
  componentWillMount() {
    console.log(this.props.location.state);
    // 如果是点击编辑按钮，就按照传过来的id
    if (this.props.location.state) {
      this.setState({
        id: this.props.location.state.id,
      });
    }
  }
  componentDidMount() {
    console.log(this.state);
    if (this.props.location.state) {
      // 获取到路由跳转传来的id后发送请求
      depDetail({ id: this.state.id }).then((res) => {
        console.log(res);
        const { data } = res.data;
        this.refs.form.setFieldsValue(data);
      });
    }
  }
  render() {
    console.log(this.props.location);
    return (
      <div
        style={{
          width: "400px",
          height: "300px",
          position: "relative",
          top: "-350px",
          left: "30px",
        }}
      >
        <Form
          name="normal_login"
          className="login-form"
          onFinish={this.onFinish}
          ref="form"
        >
          <Form.Item
            name="name"
            rules={[{ required: true, message: "请输入部门名称" }]}
            label="部门名称"
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="number"
            rules={[{ required: true, message: "请输入人员数量" }]}
            label="人员数量"
          >
            <InputNumber max={100} min={0} />
          </Form.Item>

          <Form.Item name="status" valuePropName="checked" label="是否启用">
            <Switch onChange={this.onSwitchChange} />
          </Form.Item>

          <Form.Item name="content" label="部门描述">
            <TextArea />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {this.props.location.state ? "修改" : "添加部门"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default departmentAdd;
