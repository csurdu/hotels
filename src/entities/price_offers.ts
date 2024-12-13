import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Hotel } from './hotel';

@Table({
  tableName: 'price_offers',
  timestamps: true,
})
export class PriceOffer extends Model<PriceOffer> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  OfferID: number;

  @ForeignKey(() => Hotel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  HotelID: number;

  @BelongsTo(() => Hotel)
  Hotel: Hotel;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Category: string; // Categoria camerei

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  Price: number; // Prețul categoriei respective
}
