import { Module } from '@nestjs/common';
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/default/default.module';
import { ApiModule } from './module/api/api.module';
// 引入公共的服务
import { ToolsService } from './service/tools/tools.service';

@Module({
  imports: [AdminModule, DefaultModule, ApiModule],
  controllers: [],
  providers: [ToolsService],
})
export class AppModule {}
