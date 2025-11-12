import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { Data } from "./Data";

const colorSchemes = {
  Huawei: ["#2E86DE", "#1F6FAD", "#17608A", "#14495F", "#0B2B40"],
  Xiaomi: ["#FF6B6B", "#E04F4F"],
  Apple: ["#9B59B6", "#8E44AD", "#7D3C98", "#6C3483", "#5B2C6F"],
  Tesla: ["#2ECC71", "#27AE60", "#229954"],
  comparison: ["#2E86DE", "#FF6B6B", "#9B59B6", "#2ECC71"]
};

// 固定颜色方案（5 类）
const fixedColors = {
  "核心/主业": "#1E88E5",
  "终端/设备": "#43A047",
  "云与能源": "#FB8C00",
  "服务与其他": "#8E24AA",
  "创新与汽车": "#E53935"
};

function hexToRgba(hex, alpha = 0.7) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


// 分类函数：根据子业务名称归类
function classifyBusiness(name) {
  if (/核心|ICT|汽车销售/.test(name)) return "核心/主业";
  if (/终端|iPhone|Mac|iPad|穿戴/.test(name)) return "终端/设备";
  if (/云|能源|发电|储能/.test(name)) return "云与能源";
  if (/服务|其他/.test(name)) return "服务与其他";
  if (/创新|智能汽车|电动汽车|解决方案/.test(name)) return "创新与汽车";
  return "其他";
}

export default function Charts({ shape = true, company = "all", setCompany, theme = "light" }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current, null, { renderer: "canvas" });
    }
    const chart = chartInstance.current;
    chart.clear();

    const isSingle = company !== "all";
    let option = {};

    if (isSingle) {
      // 单公司模式（保持原样）
      const data = Data[company];
      const colors = colorSchemes[company];

      if (shape) {
        option = {
          title: { left: "center", textStyle: { color: theme === "dark" ? "#E2E8F0" : "#1E293B", fontSize: 16 } },
          tooltip: { trigger: "item", formatter: "{b}: {c}亿元 ({d}%)" },
          series: [{
            type: "pie",
            radius: ["30%", "80%"],
            data: data.children.map((item, i) => ({
              value: item.value,
              name: item.name,
              itemStyle: { color: hexToRgba(colors[i%colors.length], 0.7) }
            })),
            label: { color: theme === "dark" ? "#E2E8F0" : "#1E293B" }
          }]
        };
      } else {
        option = {
          title: { left: "center", textStyle: { color: theme === "dark" ? "#E2E8F0" : "#1E293B", fontSize: 16 } },
          tooltip: { trigger: "item", formatter: "{b}: {c}亿元" },
          grid: { bottom: 80 },
          xAxis: {
            type: "category",
            data: data.children.map(i => i.name),
            axisLabel: {
              interval: 0,
              rotate: 0,
              color: theme === "dark" ? "#CBD5E1" : "#1E293B",
              formatter: v => v.match(/.{1,6}/g)?.join("\n") || v
            }
          },
          yAxis: { type: "value", axisLabel: { color: theme === "dark" ? "#CBD5E1" : "#1E293B" } },
          series: [{
            type: "bar",
            barWidth: "50%",
            data: data.children.map((item, i) => ({
              value: item.value,
              itemStyle: { color: colors[i % colors.length] }
            }))
          }]
        };
      }
    } else {
      // 全公司模式（堆叠柱状图）
      const companyNames = Object.keys(Data);

      if (shape) {
        // 饼图显示公司总收入
        option = {
          title: { left: "center" },
          tooltip: { trigger: "item", formatter: "{b}: {c}亿元 ({d}%)" },
          series: [{
            type: "pie",
            radius: ["0", "80%"],
            data: companyNames.map((c, i) => ({
              value: Data[c].value,
              name: Data[c].name,
              itemStyle: { color: hexToRgba(colorSchemes.comparison[i],0.7) }
            }))
          }]
        };
        chart.off("click");
        chart.on("click", params => {
          const clicked = companyNames.find(c => Data[c].name === params.name);
          if (clicked) setCompany(clicked);
        });
      } else {
        // ===== 堆叠柱状图部分 =====
        // 将每家公司按5类汇总
        const categories = Object.keys(fixedColors);
        const stackedData = {};

        companyNames.forEach(c => {
          const children = Data[c].children;
          const sums = Object.fromEntries(categories.map(cat => [cat, 0]));
          children.forEach(ch => {
            const cat = classifyBusiness(ch.name);
            if (sums[cat] !== undefined) sums[cat] += ch.value;
          });
          stackedData[c] = sums;
        });

        const series = categories.map(cat => ({
          name: cat,
          type: "bar",
          stack: "total",
          data: companyNames.map(c => stackedData[c][cat]),
          itemStyle: { color: fixedColors[cat] }
        }));

        option = {
          tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
          legend: {
            data: categories,
            bottom: 10,
            textStyle: { color: theme === "dark" ? "#E2E8F0" : "#1E293B" }
          },
          grid: { top: 50, bottom: 80 },
          xAxis: {
            type: "category",
            data: companyNames.map(c => Data[c].name),
            axisLabel: { color: theme === "dark" ? "#CBD5E1" : "#1E293B" }
          },
          yAxis: {
            type: "value",
            axisLabel: { color: theme === "dark" ? "#CBD5E1" : "#1E293B" }
          },
          series,
          animationDuration: 500
        };
      }
    }

    chart.setOption(option, true);

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [shape, company, theme, setCompany]);

  useEffect(() => {
    return () => {
      if (chartInstance.current) {
        chartInstance.current.dispose();
        chartInstance.current = null;
      }
    };
  }, []);

  return (<div ref={chartRef} className="w-full h-[50vh]" />);
}
