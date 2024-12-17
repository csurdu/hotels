import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException('Access denied');
  
    try {
      const decoded = jwt.verify(token, 'SECRET_KEY') as JwtPayload & { role: string }; // Type assertion
      const { role } = decoded;
  
      if (role === 'Hotel Manager' || role === 'Group Manager') {
        req.user = decoded; // Adaugă informațiile despre utilizator
        next();
      } else {
        throw new UnauthorizedException('Insufficient permissions');
      }
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
}
