import { Module } from '@nestjs/common';
import { UploadController } from './upload/upload.controller';
import { DeletefileController } from './deletefile/deletefile.controller';

@Module({
  controllers: [UploadController, DeletefileController]
})
export class ApiModule {}
