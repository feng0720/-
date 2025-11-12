import { Data } from "./Data";

export default function Content({ company }) {
  // 统一文本样式（支持亮暗模式）
  const baseText = "text-gray-800 dark:text-slate-100";

  // 1️⃣ 显示所有公司总览
  if (company === "all") {
    return (
      <div className={`w-full h-full flex flex-col items-center p-4 ${baseText}`}>
        <h1 className="text-2xl font-bold mb-2">各家公司产值对比</h1>
        <div className="h-0.5 bg-blue-500 w-full mb-4"></div>

        <table className="w-full text-base border-collapse text-center">
          <thead className="bg-blue-100 dark:bg-slate-700">
            <tr>
              <th className="border p-2">公司名称</th>
              <th className="border p-2">公司官网</th>
              <th className="border p-2">总产值 (亿元)</th>
            </tr>
          </thead>
          <tbody>
            {Object.values(Data).map((item, index) => (
              <tr
                key={index}
                className="hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors"
              >
                <td className="border p-2 font-medium">{item.name}</td>
                <td className="border p-2">
                  <a
                    href={item.address}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-sky-400 hover:underline"
                  >
                    {new URL(item.address).hostname.replace("www.", "")}
                  </a>
                </td>
                <td className="border p-2 text-blue-700 dark:text-sky-300 font-semibold">
                  {item.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  // 2️⃣ 显示单个公司详细数据
  const companyData = Data[company];
  if (!companyData) {
    return (
      <div className="text-center text-gray-600 dark:text-gray-300 p-4">
        暂无数据
      </div>
    );
  }

  return (
    <div className={`w-full h-full flex flex-col items-center p-6 ${baseText}`}>
      <h1 className="text-2xl font-bold mb-2">{companyData.name} 财务结构详情</h1>
      <div className="h-0.5 bg-blue-500 w-full mb-4"></div>

      {/* 公司基本信息 */}
      <div className="flex justify-between w-full text-md mb-3">
        <span className="text-md">
          官网：
          <a
            href={companyData.address}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 dark:text-sky-400 hover:underline"
          >
            {companyData.address}
          </a>
        </span>
        <span className="font-semibold text-md">
          总产值：<span className="text-blue-600 dark:text-sky-300">{companyData.value} 亿元</span>
        </span>
      </div>

      {/* 子产业明细表 */}
      <table className="w-full border-collapse text-center text-base">
        <thead className="bg-blue-100 dark:bg-slate-500">
          <tr>
            <th className="border p-2">产业名称</th>
            <th className="border p-2">产值 (亿元)</th>
            <th className="border p-2">占比 (%)</th>
          </tr>
        </thead>
        <tbody>
          {companyData.children.map((item, index) => {
            const ratio = ((item.value / companyData.value) * 100).toFixed(2);
            return (
              <tr
                key={index}
                className="hover:bg-blue-50 dark:hover:bg-slate-600 transition-colors"
              >
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 text-blue-700 dark:text-sky-300 font-semibold">{item.value}</td>
                <td className="border p-2 text-green-600 dark:text-emerald-300">{ratio}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
