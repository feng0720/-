import { useEffect, useState } from "react";
import { useTheme } from "../Theme";
import { Sun, Moon } from "lucide-react";

export default function Head() {
  const [animate, setAnimate] = useState(true);
  const {theme,toggleTheme} = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleToggle = ()=>{
    toggleTheme();
    setAnimate(true);
    console.log(theme);
    setTimeout(()=>setAnimate(false),2500);
  }

  return (
    <div>
    {/* 主题切换按钮 */}
    <button
      onClick={handleToggle}
      className="mt-4 top-[2vh] fixed z-50 right-[8vh] p-2 rounded-full bg-white/60 dark:bg-gray-800/50 hover:scale-110 hover:shadow-md transition-all duration-300"
    >
      {theme==='dark' ? <Moon className="w-6 h-6 text-white hover:text-blue-500" /> : <Sun className="w-6 h-6 text-black hover:text-yellow-400" />}
    </button>
    <div
      className={`
        relative flex flex-col justify-center items-center w-full
        bg-gradient-to-r from-cyan-100 via-blue-100 to-white
        dark:from-slate-900 dark:via-sky-900 dark:to-slate-800
        transition-all duration-700
        min-h-[30vh] py-8
      `}
    >
      {/* 光带动画 */}
      {animate && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-200/60 to-transparent blur-xl animate-sweep pointer-events-none" />
      )}
    
      {/* 标题 */}
      <h1
        className={`
          text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-wide text-center text-transparent bg-clip-text
          bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-300 dark:to-cyan-400
          drop-shadow-[0_0_20px_rgba(56,189,248,0.6)]
          transition-all duration-500 hover:drop-shadow-[0_0_35px_rgba(56,189,248,0.9)]
          ${animate ? "animate-glow" : ""}
          break-words
        `}
      >
        四家公司财务数据可视化平台
      </h1>
        
      <div className="h-1 w-1/2 mt-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full"></div>
        
      {/* 副标题 */}
      <div className="text-sm sm:text-lg mt-2 text-center text-gray-600 dark:text-gray-300 tracking-wide">
        扇形图 · 堆叠柱状图 - 基于真实财务数据
      </div>
        

        
      {/* 组员列表 */}
      <div className="mt-4 flex flex-wrap justify-center gap-4 text-blue-600 dark:text-sky-200">
        <div className="relative group hover:text-amber-600 hover:scale-105 transition-all duration-500 dark:hover:text-amber-400">
          林金墙
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-sky-600 text-white text-xs     sm:text-sm rounded-md px-2 py-1 transition-opacity duration-300">
            前端开发可视化实现
          </span>
        </div>
        ·
        <div className="relative group hover:text-amber-600 hover:scale-105 transition-all duration-500 dark:hover:text-amber-400">
          潘宜昊
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-sky-600 text-white text-xs     sm:text-sm rounded-md px-2 py-1 transition-opacity duration-300">
            前端设计与开发工作
          </span>
        </div>
        ·
        <div className="relative group hover:text-amber-600 hover:scale-105 transition-all duration-500 dark:hover:text-amber-400">
          李衡翔
          <span className="absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap opacity-0 group-hover:opacity-100 bg-sky-600 text-white text-xs     sm:text-sm rounded-md px-2 py-1 transition-opacity duration-300">
            可视化分析设计工作
          </span>
        </div>
      </div>
    </div>
    </div>

  );
}

