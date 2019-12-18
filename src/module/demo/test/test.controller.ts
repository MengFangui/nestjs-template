import { Controller, Get, Post, Body, Request, Response, UseInterceptors, UploadedFile } from '@nestjs/common';
// 引入服务
import { ToolsService } from '../../../service/tools/tools.service'

import { ArticleService } from '../../../service/article/article.service';
import { Config } from '../../../config/config'
// 全局变量的方法
// ${Config.adminPath}

// 文件上传
import { FileInterceptor } from '@nestjs/platform-express';
import { createWriteStream } from 'fs'
import { join } from 'path'


@Controller(`${Config.adminPath}/test`)
export class TestController {
    constructor(private toolsService: ToolsService, private articleService: ArticleService) { }
    @Get()
    index() {
        return {
            title: 'demo'
        }
    }

    // 获取验证码
    @Get('code')
    async getCode(@Request() req, @Response() response) {
        var captcha = await this.toolsService.captcha(); //服务里面的方法
        // 设置session
        req.session.code = captcha.text;
        response.type('image/svg+xml'); /*指定返回的类型*/
        response.send(captcha.data); /*给页面返回一张图片*/
    }

    @Get('article')
    async getArticle() {
        var result = await this.articleService.findAll();
        return result;
    }

    @Get('md5')
    getMd5() {
        console.log(8888)
        let result = this.toolsService.getMd5('123');
        return result;
    }

    // @Post('doAddPic')
    // pic是图片的name
    // @UseInterceptors(FileInterceptor('file'))
    // addPic(@UploadedFile() file, @Body() body) {
    //     console.log(body);
    //     console.log(file);
    //     console.log(__dirname,__filename,'999999')
    //     const writeImage = createWriteStream(join(__dirname, '../../../../public/upload', `${file.originalname}`))
    //     writeImage.write(file.buffer)
    //     console.log(9999)
    //     return '上传成功';
    // }

    // 单文件上传
    @Post('doAdd')
    // 和form表单的名字上图片的name一样
    // pic是图片的name
    @UseInterceptors(FileInterceptor('file'))
    doAdd(@Body() body, @UploadedFile() file) {
        // 一定要注意文件的路径
        const writeImage = createWriteStream(join(__dirname, '../../../../public/upload', `${file.originalname}`))
        writeImage.write(file.buffer)
    }


}
