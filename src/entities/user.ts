import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'users',
  timestamps: true, 
})
export class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  UserID: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  Username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  Email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  Password: string;

  @Column({
    type: DataType.ENUM('Hotel Manager', 'Group Manager', 'Traveler', 'Administrator', 'Data Operator'),
    allowNull: false,
  })
  Role: string;
}
