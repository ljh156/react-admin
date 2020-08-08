import React from "react";
import { Button, Input, List } from "antd";
// 引入用于连接组件和state的方法
// import { connect } from "react-redux";
import store from "../store";
import axios from "axios";

// import "antd/es/button/style";
// import "antd/es/pagination/style";
// 配置按需加载步骤：
/*
1.安装：npm i babel-plugin-import
2.然后在.babelrc中添加如下代码：{
  "plugins": [
    ["import", { libraryName: "antd", style: "css" }] // `style: true` 会加载 less 文件
  ]
}
3.node_modules/react-scripts/config/webpack.config.js中看到babelrc: false：
改为true
{
*/
export default class Demo01 extends React.Component {
  constructor(props) {
    super(props);

    // 将从store仓库中拿到的数据赋值给state
    this.state = store.getState();
    // 订阅：每当store中的数据发生改变，执行里面的操作,将store中的数据同步到state中
    store.subscribe(this.storeChange);
  }
  componentDidMount() {
    this.getList();
  }

  storeChange = () => {
    console.log(store.getState());
    this.setState(store.getState(), () => {
      console.log("数据同步了", this.state);
    });
  };
  changeInputValue = (e) => {
    const action = {
      type: "changeInput",
      value: e.target.value,
    };
    // 将action派发到reducer进行一系列操作操作
    store.dispatch(action);
  };
  getList = () => {
    axios.get("http://localhost:3001/data1").then((res) => {
      console.log(res);
      const { data } = res;
      console.log(data);
      const action = {
        type: "getList",
        data: data,
      };
      store.dispatch(action);
    });
  };
  addItem = () => {
    const action = {
      type: "addItem",
    };
    store.dispatch(action);
  };
  delItem = (index) => {
    const action = {
      type: "delItem",
      index: index,
    };
    store.dispatch(action);
  };
  render() {
    return (
      <div>
        {/* <h1>{this.props.value.count}</h1>
        <Button onClick={this.props.onIncrement} type="primary">
          increment
        </Button>
        <Button onClick={this.props.onDecrement} type="danger">
          decrement
        </Button> */}
        <div style={{ margin: "10px" }}>
          <Input
            placeholder={this.state.inputValue}
            style={{ width: "250px", marginRight: "10px" }}
            onChange={this.changeInputValue}
          />
          <Button onClick={this.addItem} type="primary">
            增加
          </Button>
        </div>
        <div>
          <List
            style={{ margin: "10px", width: "300px" }}
            bordered
            dataSource={this.state.list}
            // 遍历的item只能是字符串或dom
            renderItem={(item, index) => (
              <List.Item onClick={this.delItem.bind(this, index)}>
                {item.inputValue}
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}
