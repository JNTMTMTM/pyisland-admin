/**
 * @file main.tsx
 * @description 前端应用启动入口。
 * @description 挂载根组件并初始化全局样式。
 * @author 鸡哥
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
