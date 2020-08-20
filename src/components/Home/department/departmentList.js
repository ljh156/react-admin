import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Input, Table, Switch, message, Modal } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { getDepList, depDel, depStatus } from "../../../api/api";
import "./style.css";
export default class departmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      // 搜索关键字
      keyWord: "",
      // 控制对话框显示隐藏
      delId: "",
      visible: false,
      confirmLoading: false,
      colums: [
        { title: "部门名称", dataIndex: "name", key: "name" },
        {
          title: "是否启用",
          dataIndex: "status",
          key: "status",
          render: (text, record) => {
            return (
              <Switch
                defaultChecked={record.status === "1" ? true : false}
                onChange={() => {
                  this.onSwitchChange(record);
                }}
              ></Switch>
            );
          },
        },
        { title: "人员数量", dataIndex: "number", key: "number" },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 215,
          render: (text, record) => {
            return (
              <div className="operation">
                <Button type="primary">
                  <Link
                    to={{
                      pathname: "/home/department/add",
                      state: { id: record.id },
                    }}
                  >
                    编辑
                  </Link>
                </Button>
                <Button
                  onClick={() => {
                    this.handlerDel(record.id);
                  }}
                  type="primary"
                  danger
                >
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      depList: [],
    };
  }
  // 搜索功能
  onFinish = (value) => {
    console.log(value);
    this.setState({
      ...value,
      pageNumber: 1,
      pageSize: 10,
    });
    const { name, pageNumber, pageSize } = this.state;
    console.log({ name, pageNumber, pageSize });
    getDepList({ name, pageNumber, pageSize }).then((res) => {
      console.log(res);
      const { data } = res.data.data;
      this.setState({
        depList: data,
      });
    });
  };
  componentDidMount() {
    const { pageNumber, pageSize } = this.state;
    getDepList({ pageNumber, pageSize }).then((res) => {
      const { data } = res.data;
      console.log("====================================");
      console.log(data.data);
      console.log("====================================");
      if (data.data) {
        this.setState({
          depList: data.data,
        });
      }
    });
  }
  // 删除功能
  handlerDel = (id) => {
    console.log(id);
    if (id) {
      this.setState({
        visible: true,
        delId: id,
      });
    } else {
      this.setState({
        visible: true,
      });
    }
  };
  // 删除对话框的确定按钮
  handleOk = () => {
    this.setState({
      confirmLoading: true,
    });
    depDel({ id: this.state.delId }).then((res) => {
      console.log(res);
      if (res.data.resCode === 0) {
        message.success(res.data.message);
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }
      const { pageNumber, pageSize } = this.state;
      getDepList({ pageNumber, pageSize }).then((res) => {
        const { data } = res.data;
        console.log("====================================");
        console.log(data.data);
        console.log("====================================");
        if (data.data) {
          this.setState({
            depList: data.data,
          });
        }
      });
    });
  };
  // switch改变时触发，接收传过来得单条记录
  onSwitchChange = (data) => {
    console.log(data);
    data.status = !data.status;
    const { id, status } = data;
    depStatus({ id, status }).then((res) => {
      console.log(res);
    });
  };
  render() {
    const { colums, depList } = this.state;
    const rowSelection = {
      // 当复选框改变时收集选中的key
      onChange: (rowKey) => {
        console.log(rowKey.join());
        this.setState({
          delId: rowKey.join(),
        });
      },
    };
    return (
      <Fragment>
        <Form layout="inline" onFinish={this.onFinish}>
          <FormItem name="name" label="部门搜索">
            <Input placeholder="请输入部门名称" />
          </FormItem>
          <FormItem>
            <Button htmlType="submit" type="primary">
              搜索
            </Button>
          </FormItem>
        </Form>
        <Table
          rowSelection={rowSelection}
          rowKey="id"
          columns={colums}
          dataSource={depList}
          bordered
        ></Table>
        <Button
          onClick={() => {
            if (this.state.delId.length === 0) {
              message.info("请选择要删除的");
            } else {
              this.handlerDel();
            }
          }}
          type="primary"
          danger
        >
          批量删除
        </Button>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={() => {
            this.setState({
              visible: false,
            });
          }}
          okText="确定"
          cancelText="取消"
        >
          确定删除吗？
        </Modal>
      </Fragment>
    );
  }
}
