import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from './user';

@Table({
  tableName: 'permissions',
  timestamps: false,
})
export class Permission extends Model<Permission> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  PermissionID: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  UserID: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  CanRead: boolean;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  CanWrite: boolean;
}
