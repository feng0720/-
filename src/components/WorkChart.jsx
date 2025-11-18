import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

export default function WorkChart({ showWork,setShowWork }) {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // 三个人的数据（固定三等分）
  const dutyList = [
    { name: "林金墙", work: "前端开发可视化实现", value: 1 },
    { name: "潘宜昊", work: "前端设计与开发工作", value: 1 },
    { name: "李衡翔", work: "可视化分析设计工作", value: 1 },
  ];

  useEffect(() => {
    if (!showWork) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    chartInstance.current.setOption({
      tooltip: {
        trigger: "item",
        formatter: (params) => {
          return `
            <div style="padding:4px 4px">
              <strong>${params.data.name}</strong><br/>
              工作内容：${params.data.work}
              占比:33.3%
            </div>
          `;
        }
      },
      series: [
        {
          type: "pie",
          radius: ["30%", "70%"],
          data: dutyList,
          label: {
            formatter: "{b}",
            fontSize: 14
          }
        }
      ]
    });

    window.addEventListener("resize", chartInstance.current.resize);

    return () => {
      window.removeEventListener("resize", chartInstance.current?.resize);
    };
  }, [showWork]);

  if (!showWork) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center"
      onClick={()=>setShowWork(false)}
    >
      <div
        className="w-[50%] h-[60%] bg-gradient-to-r from-cyan-100 via-blue-100 to-white
        dark:from-indigo-900 dark:via-sky-900 dark:to-slate-600 rounded-3xl shadow-2xl p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-xl font-semibold text-center mb-4 dark:text-white">
          三人工作分工可视化
        </div>
        <div ref={chartRef} className="w-full h-[90%]"></div>
      </div>
    </div>
  );
}
