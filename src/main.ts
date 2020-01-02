import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from "path";
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
// 守卫
import { AuthGuard } from './guard/auth.guard'
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //配置静态资源目录
  // app.useStaticAssets(path.join(__dirname, '..', 'public'));
  app.useStaticAssets('public');
  //配置模板引擎
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');
  //配置 cookie 中间件
  app.use(cookieParser());
  //配置 session 的中间件
  app.use(session({
    secret: 'nestjs session',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 30, httpOnly: true },
    rolling: true
  }));
  // 允许跨域
  app.enableCors();
  // 配置全局路由守卫guard
  app.useGlobalGuards(new AuthGuard());
  await app.listen(3001);
}
bootstrap();