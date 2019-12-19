import { Controller, Get, Post, Body, Request, Response, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';

// 文件上传
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs'
import { join } from 'path'

@Controller('file-upload')
export class UploadController {

    @Get()
    index() {
        return {
            title: 'demo'
        }
    }

    // 单文件上传
    @Post('single-upload')
    // 和form表单的名字上图片的name一样,默认是file
    @UseInterceptors(FileInterceptor('file'))
    doAdd(@Body() body, @UploadedFile() file) {
        // 一定要注意文件的路径
        let fileName = `${Date.now()}-${file.originalname}`
        const writeImage = createWriteStream(join(__dirname, '../../../../public/upload', fileName))
        writeImage.write(file.buffer)

        return {
            path: `/upload/${fileName}`
        }
    }

    // 多文件上传
    @Post('multiple-uploadll')
    // 和form表单的名字上图片的name一样，默认是file
    @UseInterceptors(FilesInterceptor('file'))
    doAddAll(@Body() body, @UploadedFiles() files) {
        //如果要实现图片上传的话还需要进行一些判断
        let filesName = [],time = Date.now();
        for (const file of files) {
            let tempFile = `${time}-${file.originalname}`;
            filesName.push(tempFile);
            const writeImage = createWriteStream(join(__dirname, '../../../../public/upload',tempFile));
            writeImage.write(file.buffer);
        }
        let fileArrs = [];
        filesName.forEach(element => {
            let temp = `/upload/${element}`
            fileArrs.push(temp)
        });
        return fileArrs;
    }
}
