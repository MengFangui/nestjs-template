import { ArgumentMetadata, Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParamPipe implements PipeTransform {
  constructor(private readonly schema) { }
  transform(value: any, metadata: ArgumentMetadata) {
    // value 就是get或者post的参数
    console.log(value, '管道')
    // 可以修改数据
    // value.xxx
    // 也可以验证数据
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('传入参数有误')
    }
    return value;
  }
}
