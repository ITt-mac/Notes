
## 开发构建

### 目录结构 

```bash
├── /dist/           # 项目输出目录
├── /mock/           # 数据mock
├── /public/         # 公共文件，编译时copy至dist目录
├── /src/            # 项目源码目录
│ ├── /components/   # UI组件及UI相关方法
│ ├── /layouts/      # 全局组件
│ │ └── app.js       # 页面入口
│ │ └── index.js     # 入口文件
│ ├── /models/       # 数据模型
│ ├── /pages/        # 页面组件
│ │ └── document.ejs # html模版
│ ├── /services/     # 数据接口
│ ├── /themes/       # 项目样式
│ │ ├── default.less # 全局样式
│ │ └── vars.less    # 全局样式变量
│ ├── /utils/        # 工具函数
│ │ ├── config.js    # 项目常规配置
│ │ ├── menu.js      # 菜单及面包屑配置
│ │ ├── config.js    # 项目常规配置
│ │ ├── request.js   # 异步请求函数(axios)
│ │ └── theme.js     # 项目需要在js中使用到样式变量
├── package.json     # 项目信息
├── .eslintrc        # Eslint配置
└── .umirc.js        # umi配置
└── .umirc.mock.js   # mock配置
└── .theme.config.js # 主题less编译配置
```


### 快速开始

SVN更新项目

进入目录安装依赖:

```bash
#开始前请确保没有安装roadhog、webpack到NPM全局目录, 国内用户推荐yarn或者cnpm
npm i 或者 yarn install
```

开发：

```bash
npm run start 或 yarnstart
打开 http://localhost:8000 #端口在package.json中cross-env后加上 PORT=8000指定
```

构建:

```bash
npm run build
将生成的dist目录提交至SVN发布
```
