import React, { Component, Fragment } from "react";
import { Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import router from "../../router/index";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

console.log(router);

class Aside extends Component {
  // 渲染二级菜单的方法
  renderSubMenu({ key, title, children }) {
    return (
      <SubMenu key={key} icon={<UserOutlined />} title={title}>
        {/* 在二级菜单中再判断是否存在children属性，判断是否进行三级渲染 */}
        {children &&
          children.map((item, index) => {
            return item.children && item.children.length > 0
              ? this.renderSubMenu(item)
              : this.renderMenu(item);
          })}
      </SubMenu>
    );
  }
  renderMenu({ key, title }) {
    return (
      <Menu.Item key={key} icon={<PieChartOutlined />}>
        <Link to={key}>{title}</Link>
      </Menu.Item>
    );
  }
  render() {
    return (
      <Fragment>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          {/* 判断每个item有没有children属性，没有的话就渲染一级菜单 */}
          {router &&
            router.map((item, index) => {
              return item.children && item.children.length > 0
                ? this.renderSubMenu(item)
                : this.renderMenu(item);
            })}

          {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
            控制台
          </Menu.Item> */}
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu> */}
        </Menu>
      </Fragment>
    );
  }
}

export default Aside;
