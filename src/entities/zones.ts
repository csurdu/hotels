import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Region } from './region';

@Table({
  tableName: 'zones',
})
export class Zone extends Model<Zone> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  ZoneID: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  ZoneName: string;

  @ForeignKey(() => Region) 
  @Column({
    type: DataType.INTEGER,
  })
  RegionID: number;

  @BelongsTo(() => Region) 
  Region: Region;
}
