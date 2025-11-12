import { useState } from 'react'
import { ThemeProvider, useTheme } from './Theme'
import Head from './components/Head';
import Charts from './components/Charts';
import Content from './components/Content';
import Footer from './components/Footer';
import { Data } from './components/Data';

function Main() {
  const {theme,setTheme} = useTheme(); 
  const [shape,setShape] = useState(true);
  const [company,setCompany] = useState('all');

  // 切换图形
  const toggleShape = ()=>{
    setShape(!shape);
    console.log(shape);
  }

  // 切换公司
  const handleChange = (event)=>{
    const value = event.target.value;
    setCompany(value);
  }

  return (
    <div >
      <Head></Head>
      <div className='flex justify-between px-[5%] relative h-[70vh] transition-all bg-gradient-to-r from-cyan-100 via-blue-100 to-white
        dark:from-slate-900 dark:via-sky-900 dark:to-slate-800'>
        <div className="w-3/5 h-full relative flex flex-col items-center justify-start bg-gradient-to-r from-cyan-100 via-blue-100 to-white
        dark:from-slate-700 dark:via-sky-900 dark:to-slate-600 rounded-2xl shadow-md border border-blue-300 dark:border-sky-700 transition-colors duration-300">
          {/* 顶部按钮组 */}
          <div className="absolute top-6 flex space-x-4">
            <button
              onClick={()=>{
                if(shape===false){
                  toggleShape();
                }
              }}
              className="px-4 py-1 rounded-lg font-medium bg-white text-blue-800 border border-blue-400 shadow-sm hover:bg-blue-50 active:scale-90 transition dark:bg-sky-700 dark:text-sky-100 dark:border-sky-500 dark:hover:bg-sky-600"
            >
              饼状图
            </button>
            <button
              onClick={()=>{
                if(shape===true){
                  toggleShape();
                }
              }}
              className="px-4 py-1 rounded-lg font-medium bg-white text-blue-800 border border-blue-400 shadow-sm hover:bg-blue-50 active:scale-90 transition dark:bg-sky-700 dark:text-sky-100 dark:border-sky-500 dark:hover:bg-sky-600"
            >
              柱状图
            </button>
          </div>

          <div className='flex absolute top-20 font-semibold text-blue-800 dark:text-sky-100'>
            {company==="all"?"公司总体收入":Data[company].name}
          </div>
          {/* 中间图表占位 */}
          <div className="flex-1 flex items-center justify-center w-full pt-[10%]">
            <Charts shape={shape} company={company} setCompany={setCompany} theme={theme}></Charts>
            <div className='absolute text-green-700 dark:text-orange-300 hover:scale-110 transition-all druation-500'>
              {company==='all'?false:true&&<a href={company==='all'?'':Data[company].address} target='blank'>{company}</a>}
            </div>
          </div>

          {/* 底部公司选择 */}
          <div className="absolute top-6 right-10 flex">
            <label>
              <select
                value={company}
                onChange={(e)=>handleChange(e)}
                className="px-3 py-1 rounded-lg border border-blue-300 dark:border-sky-600 bg-white dark:bg-sky-800 text-blue-800 dark:text-sky-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-sky-500 transition"
              >
                <option value="all">所有公司对比</option>
                <option value="Huawei">华为</option>
                <option value="Xiaomi">小米</option>
                <option value="Apple">苹果</option>
                <option value="Tesla">特斯拉</option>
              </select>
            </label>
          </div>
        </div>
        <div className="w-1/3 h-full relative flex flex-col items-center justify-start bg-gradient-to-r from-blue-100 via-cyan-100 to-white
        dark:from-slate-500 dark:via-sky-800 dark:to-slate-600 rounded-2xl shadow-md border border-blue-300 dark:border-sky-700 transition-colors duration-300">
          <Content company={company}></Content>
        </div>
      </div>
      <div className='flex justify-between px-[5%] relative h-[15vh] transition-all bg-gradient-to-r from-cyan-100 via-blue-100 to-white
        dark:from-slate-900 dark:via-sky-900 dark:to-slate-800 '>
        <Footer></Footer>
      </div>
    </div>
  )
}

function App(){
  return(
    <ThemeProvider>
      <Main/>
    </ThemeProvider>
  )
}

export default App
