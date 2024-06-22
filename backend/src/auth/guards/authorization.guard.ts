import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserRole } from 'src/apis/users/UserSchema/user.schema';
import { JwtMiddleware } from '../JWT/jwt.decode';
import * as jwt from 'jsonwebtoken';
interface DecodedToken {
  role: UserRole;
}
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userRole = decoded as DecodedToken;
        if (userRole.role === UserRole.ADMIN) {
          return true; 
        } else {
          return false; 
        }
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          console.log('Token đã hết hạn');
        } else {
          console.log('Lỗi xác thực token:', err.message);
        }
      }
    }

  }
}

