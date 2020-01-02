import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {

    // 以下是跳转前的逻辑
    // var pathname=req.baseUrl;  //获取访问的地址
    // var userinfo=req.session.userinfo;
    // if(userinfo && userinfo.username){
    //   next();
    // }else{
    //   //排除不需要做权限判断的页面  
    //   if(pathname=='/admin/login' || pathname=='/admin/login/code' ||  pathname=='/admin/login/doLogin'){
    //     next();
    //   }else{
    //     res.redirect('/admin/login');
    //   }
    // }

    // 设置全局模板变量的方法
    // 前后端分离项目一般不会用
    res.locals.info = {
      name: 'mfg'
    }
    console.log('服务器打印：middle 中间件')
    next();
  }
}
