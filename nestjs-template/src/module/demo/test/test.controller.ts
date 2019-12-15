import { Controller, Get, Request, Response } from '@nestjs/common';
// 引入服务
import { ToolsService } from '../../../service/tools/tools.service'

import { ArticleService } from '../../../service/article/article.service';

@Controller('demo/test')
export class TestController {
    constructor(private toolsService: ToolsService, private articleService: ArticleService) { }
    @Get()
    index() {
        return 'demo test页面'
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


}
