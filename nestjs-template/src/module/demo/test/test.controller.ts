import { Controller, Get } from '@nestjs/common';

@Controller('demo/test')
export class TestController {
    @Get()
    index(){
        return 'demo test页面'
    }
}
