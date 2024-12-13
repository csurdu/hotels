import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Airport } from '../entities/airport';

@Injectable()
export class AirportService {
  async findAll(): Promise<Airport[]> {
    return Airport.findAll({ include: ['City'] });
  }

  async findOne(airportId: number): Promise<Airport> {
    return Airport.findByPk(airportId, { include: ['City'] });
  }

  async create(data: {
    IATACode: string;
    AirportName: string;
    CityID: number;
    Latitude: number;
    Longitude: number;
  }): Promise<Airport> {
    return Airport.create(data);
  }

  async update(airportId: number, data: Partial<Airport>): Promise<any> {
    return Airport.update(data, { where: { AirportID: airportId } });
  }

  async delete(airportId: number): Promise<any> {
    return Airport.destroy({ where: { AirportID: airportId } });
  }
}
