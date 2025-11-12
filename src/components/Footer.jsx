export default function Footer() {
  return (
    <footer
      className="
        w-[90%] mx-auto my-3
        bg-gradient-to-r from-blue-50 via-cyan-50 to-white
        dark:from-slate-700 dark:via-sky-900 dark:to-slate-700
        border border-blue-200 dark:border-sky-700
        rounded-2xl shadow-md
        py-3 px-6
        flex flex-col sm:flex-row items-center justify-between
        text-sm sm:text-base
        text-slate-700 dark:text-slate-200
        transition-all duration-500
      "
    >
      {/* 左侧：数据来源 */}
      <div className="flex items-center gap-2">
        <span className="font-medium">数据来源：</span>
        <span className="text-blue-600 dark:text-sky-400">
          各公司公开财报
        </span>
      </div>

      <div
        className="
          text-blue-600 dark:text-sky-400
          hover:scale-110
          hover:text-cyan-500 dark:hover:text-cyan-300
          hover:drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]
          transition-all duration-300
        "
      >
        <a
          href="https://github.com/feng0720/-"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium"
        >
          项目地址
        </a>
      </div>


      {/* 右侧：版权信息 */}
      <div className="text-center sm:text-right mt-2 sm:mt-0">
        ©
        <span className="text-blue-600 dark:text-sky-400">
          四家公司财务数据展示
        </span>
      </div>

    </footer>
  );
}
