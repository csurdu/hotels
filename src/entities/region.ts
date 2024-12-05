import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Hotel } from './hotel';
import { Zone } from './zones';

@Table({
  tableName: 'regions',
})
export class Region extends Model<Region> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  RegionID: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  RegionName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Country: string;

  @HasMany(() => Hotel)
  hotels: Hotel[];

  @HasMany(() => Zone)
  zones: Zone[];
}
