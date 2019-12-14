import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
// 引入公共的服务
import { ToolsService } from './service/tools/tools.service';
import { DemoModule } from './module/demo/demo.module';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule, DemoModule],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule {}
