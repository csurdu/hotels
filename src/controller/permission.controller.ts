import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { PermissionsService } from '../service/permission.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Post('set')
  async setPermissions(@Body() body: { UserID: number; CanRead: boolean; CanWrite: boolean }) {
    return this.permissionsService.setPermissions(body.UserID, body.CanRead, body.CanWrite);
  }

  @Get(':userId')
  async getPermissions(@Param('userId') userId: number) {
    return this.permissionsService.getPermissions(userId);
  }
}
