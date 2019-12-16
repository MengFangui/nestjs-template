import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticleService {
    constructor(@InjectModel('Article') private articleModel){}
    //在数据库里面查询全部文章
    async findAll(json={}){

        var result=await this.articleModel.find(json).exec();

        return result;
    }
}
