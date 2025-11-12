import { createContext, useContext, useLayoutEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children})=>{
  const [theme,setTheme] = useState('light');

  useLayoutEffect(()=>{
    // 获取保存在本地上的theme
    const savedTheme = localStorage.getItem('theme');

    if(savedTheme === 'dark'){
      // 在<html>上设置data-theme属性然后可以配合触发dark:风格
      document.documentElement.setAttribute("data-theme", "dark");
      setTheme("dark");
    } else if(savedTheme === 'light'){
      document.documentElement.setAttribute("data-theme", "light");
      setTheme("light");
    }
    else {
      // 检测用户现在使用的系统主题如果是dark就匹配上返回true
      const preferDark = window.matchMedia("prefers-color-scheme: dark").matches;
      const nextTheme = preferDark?"dark":"light"; // 看
      document.documentElement.getAttribute("data-theme",nextTheme);
      setTheme(nextTheme);
    }
  },[]);

   // 主题切换函数
  const toggleTheme = ()=>{
    const nextTheme = theme === 'light'?'dark':'light';
    document.documentElement.setAttribute("data-theme",nextTheme);
    setTheme(nextTheme);
    localStorage.setItem("theme",nextTheme); // 保存当前的主题使得下次可以记得
  };

  return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = ()=>{
  const context = useContext(ThemeContext);
  if(!context) throw new Error("useTheme must be used within a ThemeProvider");
  return context;
}