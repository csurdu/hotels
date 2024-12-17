import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  // Înregistrare utilizator
  async register(data: { Username: string; Email: string; Password: string; Role: string }) {
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const user = await this.userModel.create({
      ...data,
      Password: hashedPassword,
    });
    return { message: 'User created successfully', user };
  }

  // Autentificare utilizator
  async login(email: string, password: string) {
    const user = await this.userModel.findOne({ where: { Email: email } });
    if (!user) throw new UnauthorizedException('Invalid email or password');

    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid email or password');

    const token = jwt.sign({ id: user.UserID, role: user.Role }, 'SECRET_KEY', { expiresIn: '1h' });

    return { message: 'Login successful', token };
  }

  async generateMagicLink(userId: number): Promise<string> {
    const token = jwt.sign({ id: userId, type: 'invitation' }, 'SECRET_KEY', { expiresIn: '24h' });
    return `http://localhost:3000/auth/magic-link?token=${token}`;
  }
  
}
