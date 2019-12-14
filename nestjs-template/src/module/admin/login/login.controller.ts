import { Controller, Get } from '@nestjs/common';

@Controller('admin/login')
export class LoginController {
    @Get()
    index(){
        return '后台首页'
    }
}
