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
### 安装插件
```
cnpm instlal cookie-parser --save
```
### 引入插件（main.ts）
```
import * as cookieParser from 'cookie-parser'
```
### 配置插件
```
app.use(cookieParser());
```
### 设置cookie
```
res.cookie("name",'mfg');
```
### 获取cookie
```
getCookies(@Request() req){
return req.cookies.name;
}
```
### 删除cookie
```
res.cookie('username','',{maxAge:0});
```
### cookie设置参数
#### maxAge 过期时间，单位ms
#### secure true时，https有效，http无效
#### httpOnly true时，js不能读取cookie，防止xss

## session
### 介绍
Cookie  保存在客户端浏览器中 ，而 session 保存
在服务器上。
### 安装
```
cnpm install express-session --save
```
### 引入
```
import * as session from 'express-session'; 
```
### 配置session
```
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))
```
### 设置session
```
// 设置session
    @Get('set-session')
    setSession(@Request() req){
        req.session.sessionTest = "mfg";
    }
```
### 获取session
```
// 获取session
    @Get('get-session')
    getSession(@Request() req){
       return req.session.sessionTest
    }
```
### session销毁
```
req.session.destroy(function(err) { /*销毁 session*/
})
```
### session参数
#### secret session加密
#### name 返回客户端的 key 的名称，默认为 connect.sid,也可以自己设置（即name的值）。
#### 

## express
## ejs
```bash
cnpm i cookie-parser express-session ejs --save
```
## pipe
### 介绍
Nestjs 中的管道可以将输入数据转换为所需的输出。此外，它也可以处理验证，
当数据不正确时可能会抛出异常。
常用于输入数据验证。
### 创建管道
```
nest g pipe user
```
#### 管道代码
```
@Injectable()
export class NewsPipe implements PipeTransform {
  constructor(private readonly schema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // value 就是get或者post的参数
    console.log(value, '管道')
    // 可以修改数据
    // value.xxx
    // 也可以验证数据
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('发送语义有误')
    }
    return value;
  }
}

```
### 使用管道
常结合Joi插件使用管道
```
// 引入管道
import { NewsPipe } from '../pipe/news.pipe'
import * as Joi from '@hapi/joi';
let rootInfo = Joi.object().keys({
    name: Joi.string().required(),
    age: Joi.number().integer().min(6).max(66).required(),
})
```
```
// 管道实例
    @Get('/pipe')
    @UsePipes(new NewsPipe(rootInfo))
    // http://localhost:3000/news/pipe
    pipe(@Query() query) {
        console.log(query)
    }
```
若传入的参数不对的话，会抛出400的出错误码。
```
{"statusCode":400,"error":"Bad Request","message":"发送语义有误"}
```
## guard
### 守卫介绍
守卫有一个单独的责任。它们确定请求是否应该由路由处理程序处理。到目前为止，访问限
制逻辑大多在中间件内。这样很好，因为诸如 token 验证或将 request 对象附加属性与
特定路由没有强关联。但中间件是非常笨的。它不知道调用 next() 函数后会执行哪个处
理程序。另一方面，守卫可以访问 ExecutionContext 对象，所以我们确切知道将要执行
什么。
即：在 Nextjs 中如果我们想做权限判断的话可以在守卫中完成，也可以在中间件中完
成。
### 创建守卫
```
nest g guard auth
```
#### 守卫代码
```
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

// 在 Nextjs 中如果我们想做权限判断的话可以在守卫中完成，也可以在中间件中完
// 成。
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let req = context.switchToHttp().getRequest();
    // 登录页面不需要权限验证
    if (req.path == '/admin/login') {
      return true
    } else {
      let username = context.switchToHttp().getRequest().session.username
      // 根据业务写逻辑
      // if (username) {
      //   return true;
      // } else {
      //   return false;
      // }
      // false是没有权限 显示403错误
      return true;
    }
  }
}

```
### 使用守卫
```
@Get()
    // http://127.0.0.1:3000/usernew
    // 配置守卫 也可以在方法上创建守卫
    @UseGuards(AuthGuard)
    index() {
        return '我是admin模块下的user'
    }
```
或者也可以直接加在控制器上面
```
@Controller('usernew')
// 配置守卫 这里是usernew下的路由都是守卫的
@UseGuards(AuthGuard)
```
### 全局守卫
```
//全局守卫
app.useGlobalGuards(new AuthGuard());
```

### 守卫中获取 Cookie 和 和 Session
```
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
canActivate(
context: ExecutionContext,
): boolean | Promise<boolean> | Observable<boolean> {
console.log(context.switchToHttp().getRequest().cookies);
console.log(context.switchToHttp().getRequest().session);
return true;
}
}
```

## md5 加密

## svg-captcha 图片验证码

# 中间件
## 介绍
中间件就是匹配路由之前或者匹配路由完成做的一系列的操作。中间件中如果想往下
匹配的话，那么需要写 next()。
类似前端的路由守卫。
## 创建中间件
```bash
nest g middleware middleware/adminauth
```
## 配置中间件（app.module中）
```
// 配置middlewire中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes('demo/*');
  }
}
```
#### 配置多个中间件
```
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```
### 全局中间件
全局中间件是函数中间件
```
export function logger(req, res, next) {
console.log(`Request...`);
next();
};
```

```
const app = await NestFactory.create(ApplicationModule);
app.use(logger);
await app.listen(3001);
```
# 数据库操作
```bash
yarn add @nestjs/mongoose mongoose
```