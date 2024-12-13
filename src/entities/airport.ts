import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { City } from './city';

@Table({
  tableName: 'airports',
  timestamps: true,
})
export class Airport extends Model<Airport> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  AirportID: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
  })
  IATACode: string; // Codul IATA al aeroportului (de ex. LAX, JFK)

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  AirportName: string; // Numele complet al aeroportului

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  CityID: number; // ID-ul orașului unde se află aeroportul

  @BelongsTo(() => City)
  City: City;

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  Latitude: number; // Latitudinea aeroportului

  @Column({
    type: DataType.DECIMAL(9, 6),
    allowNull: false,
  })
  Longitude: number; // Longitudinea aeroportului
}
