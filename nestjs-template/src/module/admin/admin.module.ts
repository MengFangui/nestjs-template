import { Module } from '@nestjs/common';
import { LoginController } from './login/login.controller';
// 引入公共的服务
import { ToolsService } from '../../service/tools/tools.service';

@Module({
  controllers: [LoginController],
  providers: [ToolsService],
})
export class AdminModule {}
