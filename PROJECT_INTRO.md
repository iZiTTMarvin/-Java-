# 智能家居控制系统（前端）

更新时间：2025-10-31

项目简介
- 本项目是一个基于 Vue 3 + Vue Router + Element Plus 的智能家居控制系统前端。
- 目标：提供登录/注册、主页看板、设备管理、用户信息等功能的美观易用界面。
- 当前后端未接入，数据暂存于浏览器 localStorage，便于本地演示与后续无缝对接后端 API。

主要功能
- 账户模块：登录/注册、记录最近登录时间、路由守卫（未登录跳转登录页）。
- 首页看板：设备统计（总数/在线/离线）、最近活动、快捷操作。
- 设备管理：本地增删（添加）、开关设备状态并持久化到 localStorage。
- 用户信息：读取当前登录用户信息（用户名、注册时间、最近登录）。
- 视觉优化：全局玻璃拟态风格、导航栏/侧边栏/表格/按钮等统一美化。

技术栈
- Vue 3（Composition API）
- Vue Router 4
- Element Plus
- 构建工具：@vue/cli-service

目录结构（前端）
- vue-frontend/
  - package.json
  - src/
    - main.js, App.vue
    - router/index.js
    - components/NavBar.vue, SideBar.vue
    - views/Home.vue, Login.vue, DeviceManager.vue, UserProfile.vue

开发与构建
- 开发：在 vue-frontend 目录执行
  - npm run serve
- 构建：在 vue-frontend 目录执行
  - npm run build（输出到 vue-frontend/dist/，仓库已忽略）

后续对接后端建议
- 使用 axios 封装请求与拦截器，统一鉴权与错误处理。
- 将 localStorage 的用户与设备数据替换为真实 API。
- 使用 .env.* 管理接口地址与环境变量。

注意
- 仓库忽略了构建产物 dist/、node_modules/、编辑器配置等无关文件。
- 可在需要时将演示用户数据 JSON 文件纳入版本控制（按需新增）。
