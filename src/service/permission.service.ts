import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from '../entities/permissions';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission) private permissionModel: typeof Permission) {}

  async setPermissions(userId: number, canRead: boolean, canWrite: boolean) {
    return await this.permissionModel.upsert({ UserID: userId, CanRead: canRead, CanWrite: canWrite });
  }

  async getPermissions(userId: number) {
    return await this.permissionModel.findOne({ where: { UserID: userId } });
  }
}
