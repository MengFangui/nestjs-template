import { Injectable } from '@nestjs/common';


// var svgCaptcha = require('svg-captcha');

// 引入验证码库
import * as svgCaptcha from 'svg-captcha'
// md5加密
import * as md5 from 'md5'

@Injectable()
export class ToolsService {
    //生成验证码
    async captcha() {
        var captcha = svgCaptcha.create({
            size: 4,
            fontSize: 50,
            width: 100,
            height: 40,
            background: "#cc9966"
        });
        return captcha;
    }
    getMd5(str:String){
        return md5(str)
    }
}
