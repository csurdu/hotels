import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Hotel } from './hotel';

@Table({
  tableName: 'groups',
  timestamps: true,
})
export class Group extends Model<Group> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  GroupID: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  GroupName: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  Description: string;

  @HasMany(() => Hotel)
  Hotels: Hotel[];
}
