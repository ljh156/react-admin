import React, { Component } from "react";
import { Layout, Breadcrumb } from "antd";
import Aside from "./Aside";
import "./home.css";
import ContentMain from "./ContentMain";

const { Header, Content, Footer, Sider } = Layout;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    return (
      <div>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider>
            <Aside />
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: "0 16px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              {/* 内容主体部分 */}
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <ContentMain />
              </div>

              {/* ///// */}
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
            </Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}
