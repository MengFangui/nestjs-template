import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';

@Module({
  controllers: [UploadController]
})
export class ApiModule {}
