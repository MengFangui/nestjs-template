import { Module } from '@nestjs/common';
import { TestController } from './test/test.controller';
// 引入公共的服务
import { ToolsService } from '../../service/tools/tools.service';
// 数据库相关
import { MongooseModule } from '@nestjs/mongoose';
import { ArticleSchema } from '../../schema/admin.schema';
// 配置服务
import { ArticleService } from '../../service/article/article.service';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: "Article",
      schema: ArticleSchema,
      collection: 'article',
    }
  ])],
  controllers: [TestController],
  // 公共服务
  providers: [ToolsService, ArticleService],
})
export class DemoModule { }
