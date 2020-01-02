import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let username = context.switchToHttp().getRequest().session.username
      // 根据业务写逻辑
      // if (username) {
      //   return true;
      // } else {
      //   return false;
      // }
      // false是没有权限 显示403错误
    console.log('guard 控制')
    return true;
  }
}
