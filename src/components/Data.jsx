// 四家公司财务数据汇总（用于树形图、扇形图、堆叠柱状图）
export const Data = {
  Huawei: {
    name: "华为公司",
    address: "https://www.huawei.com/cn/",
    value: 8620,
    children: [
      { name: "ICT基础设施业务", value: 3699 },
      { name: "终端业务", value: 3390 },
      { name: "数字能源业务", value: 687 },
      { name: "云计算业务", value: 385 },
      { name: "智能汽车解决方案", value: 264 }
    ]
  },
  Xiaomi: {
    name: "小米集团",
    address: "https://www.mi.com/index.html",
    value: 3659,
    children: [
      { name: "智能手机等核心业务", value: 3331 },
      { name: "智能电动汽车等创新业务", value: 328 }
    ]
  },
  Apple: {
    name: "苹果公司",
    address: "https://www.apple.com.cn/",
    value: 27300, // 已转换为亿元人民币估算
    children: [
      { name: "iPhone", value: 14243 },
      { name: "服务收入", value: 6049 },
      { name: "Mac", value: 2300 },
      { name: "穿戴设备、家居及配件", value: 2826 },
      { name: "iPad", value: 1796 }
    ]
  },
  Tesla: {
    name: "特斯拉",
    address: "https://www.tesla.cn/",
    value: 6900, // 已转换为亿元人民币估算
    children: [
      { name: "汽车销售业务", value: 5850 },
      { name: "发电及储能业务", value: 596 },
      { name: "服务及其他业务", value: 454 }
    ]
  }
};
