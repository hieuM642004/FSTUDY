import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (token) {
      try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET); 
        
        req.user = decoded;
      } catch (err) {
        console.error(err);
      }
    }

    next();
  }
}
