import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
// 引入公共的服务
import { ToolsService } from './service/tools/tools.service';
import { DemoModule } from './module/demo/demo.module';
// 配置中间件
import { AdminauthMiddleware } from './middleware/adminauth.middleware'

// 配置数据库
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule, DemoModule,
    MongooseModule.forRoot('mongodb://mfg:123456@127.0.0.1:27017/mfg', { useNewUrlParser: true, useUnifiedTopology: true })
  ],
  controllers: [],
  providers: [ToolsService],
})
// 配置middlewire中间件
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes('demo/*');
  }
}
