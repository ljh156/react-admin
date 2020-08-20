const router = [
  {
    title: "控制台",
    icon: "home",
    key: "/home",
  },
  {
    title: "用户管理",
    icon: "laptop",
    key: "/home/user",
    children: [
      { title: "用户列表", icon: "", key: "/home/user/list" },
      { title: "添加用户", icon: "", key: "/home/user/add" },
    ],
  },
  {
    title: "部门管理",
    icon: "bars",
    key: "/home/navigation",
    children: [
      { key: "/home/department/add", title: "添加部门", icon: "" },
      { key: "/home/department/list", title: "部门列表", icon: "" },
    ],
  },
  {
    title: "职位管理",
    icon: "edit",
    key: "/home/entry",
    children: [
      { key: "/home/navigation/dropdown", title: "职位列表", icon: "" },
      { key: "/home/navigation/dropdowna", title: "添加职位", icon: "" },
    ],
  },
  {
    title: "请假",
    icon: "info-circle-o",
    key: "/home/about",
  },
  {
    title: "加班",
    icon: "info-circle-0",
    key: "/home/jiaban",
  },
];
export default router;
