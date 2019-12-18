## 目录说明
## src/module 模块
### src/module/admin 后台模块
### src/module/default 前台模块
### src/module/admin api模块、
### src/module/demo demo模块
使用如下命令创建模块：
```bash
nest g module module/api
```
使用如下命令创建控制器
```bash
nest g controller module/admin/login
```

## src/service 公共服务
## src/config 配置文件
## src/extend 模板引擎扩展的一些方法
## src/middleware 中间件
## src/schema 数据库schema
## src/interface 接口

## public 静态资源目录
## views 模板目录

#插件
## cookie
## express
## ejs
```bash
cnpm i cookie-parser express-session ejs --save
```
## md5 加密

## svg-captcha 图片验证码

# 中间件
```bash
nest g middleware middleware/adminauth
```

# 数据库操作
```bash
yarn add @nestjs/mongoose mongoose
```