export const companyFinancialData = {
  Huawei: {
    name: '华为技术 (2024)',
    value: 8620,
    children: [
      { name: 'ICT基础设施业务', value: 3699 },
      { name: '终端业务', value: 3390 },
      { name: '数字能源业务', value: 687 },
      { name: '云计算业务', value: 385 },
      { name: '智能汽车解决方案', value: 264 }
    ]
  },
  Xiaomi: {
    name: '小米集团 (2024)',
    value: 3659,
    children: [
      { name: '智能手机等核心业务', value: 3331 },
      { name: '智能电动汽车等创新业务', value: 328 }
    ]
  },
  Apple: {
    name: '苹果公司 (2023财年)',
    value: 27300,
    children: [
      { name: 'iPhone', value: 14243 },
      { name: '服务收入', value: 6049 },
      { name: 'Mac', value: 2300 },
      { name: '穿戴设备、家居及配件', value: 2826 },
      { name: 'iPad', value: 1796 }
    ]
  },
  Tesla: {
    name: '特斯拉 (2023财年)',
    value: 6900,
    children: [
      { name: '汽车销售业务', value: 5850 },
      { name: '发电及储能业务', value: 596 },
      { name: '服务及其他业务', value: 454 }
    ]
  }
};

export const colorSchemes = {
  Huawei: ['#2E86DE', '#1F6FAD', '#17608A', '#14495F', '#0B2B40'],
  Xiaomi: ['#FF6B6B', '#E04F4F'],
  Apple: ['#9B59B6', '#8E44AD', '#7D3C98', '#6C3483', '#5B2C6F'],
  Tesla: ['#2ECC71', '#27AE60', '#229954'],
  comparison: ['#2E86DE', '#FF6B6B', '#9B59B6', '#2ECC71']
};

export const companiesList = ['Huawei', 'Xiaomi', 'Apple', 'Tesla'];
