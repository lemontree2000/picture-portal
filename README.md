# Picture Portal 
> 个人图床 Chrome Extension



## 目录结构
```
.
├── app --------------------------- Chrome扩展主要文件目录
│   ├── icons --------------------- Chrome扩展图标目录
│   ├── manifest.json ------------- Chrome扩展配置文件
│   └── scripts ------------------- Chrome扩展脚本文件目录
│       ├── background.js --------- background脚本
│       ├── chromereload.js ------- 热重载脚本
│       └── content.js ------------ content脚本
├── build ------------------------- webpack配置目录
├── dist -------------------------- 编译生成后的Chrome扩展文件
├── gulpfile.js ------------------- gulp自动化脚本配置
├── ui ---------------------------- popup和option页面UI
```

## 开发

1. 开发Chrome脚本
```
yarn install
yarn dev
```

2. 开发UI
```shell
$ cd ui
$ yarn install
$ yarn watch
```

然后使用 Chrome 加载`dist`目录生成的扩展文件。

## 编译

```
yarn build
```

## 参考了以下资源

* [微博图床 @Aqours](https://github.com/Semibold/Weibo-Picture-Store)
* [Chrome插件&Vue脚手架 @jae-jae](https://github.com/jae-jae/chrome-extension-gulu) 
