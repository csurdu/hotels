import { Column, DataType, Model, Table, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { City } from './city';
import { Region } from './region';
import { Group } from './groups';
import { PriceOffer } from './price_offers';

@Table({
  tableName: 'hotels',
})
export class Hotel extends Model<Hotel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  HotelID: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  HotelName: string;

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  Latitude: number;

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  Longitude: number;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  RegionID: number;

  @BelongsTo(() => Region)
  Region: Region;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  CityID: number;

  @BelongsTo(() => City)
  City: City;

  @ForeignKey(() => Group)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  GroupID: number;

  @BelongsTo(() => Group)
  Group: Group;

  @HasMany(() => PriceOffer)
  PriceOffers: PriceOffer[];

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  Address: string;
}
