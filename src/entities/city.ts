import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { Hotel } from './hotel';

@Table({
  tableName: 'cities',
})
export class City extends Model<City> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  CityID: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  CityName: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  Country: string;

  @HasMany(() => Hotel) // Relația cu Hotel
  hotels: Hotel[];
}
