import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { City } from '../entities/city';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City)
    private readonly cityModel: typeof City,
  ) {}

  // Găsește toate orașele
  async findAll(): Promise<City[]> {
    return this.cityModel.findAll({
      include: ['hotels'], // Include relația cu hotels
    });
  }

  // Găsește un oraș după ID
  async findOne(id: number): Promise<City> {
    return this.cityModel.findOne({
      where: { CityID: id },
      include: ['hotels'], // Include relația cu hotels
    });
  }

  // Creează un oraș nou
  async create(city: City): Promise<City> {
    return this.cityModel.create(city);
  }

  // Actualizează un oraș existent
  async update(id: number, city: Partial<City>): Promise<any> {
    return this.cityModel.update(city, { where: { CityID: id } });
  }

  // Șterge un oraș după ID
  async remove(id: number): Promise<any> {
    return this.cityModel.destroy({ where: { CityID: id } });
  }
}
