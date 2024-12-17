import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../service/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: { Username: string; Email: string; Password: string; Role: string }) {
    return this.authService.register(body);
  }

  @Post('login')
  async login(@Body() body: { Email: string; Password: string }) {
    return this.authService.login(body.Email, body.Password);
  }
  @Post('send-invitation')
async sendInvitation(@Body() body: { UserID: number }) {
  const link = await this.authService.generateMagicLink(body.UserID);
  return { message: 'Invitation link generated', link };
}

}
