import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from '../entities/hotel';

@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel) // Injectează modelul Sequelize
    private readonly hotelModel: typeof Hotel,
  ) {}

  // Găsește toate hotelurile
  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll({
      include: ['City', 'Region'], // Include relațiile dacă sunt definite
    });
  }

  // Găsește un singur hotel după ID
  async findOne(id: number): Promise<Hotel> {
    return this.hotelModel.findOne({
      where: { HotelID: id },
      include: ['City', 'Region'], // Include relațiile dacă sunt definite
    });
  }
  // Găsește un hotel după nume
  async findByName(name: string): Promise<Hotel> {
    return this.hotelModel.findOne({
      where: { HotelName: name }, // Caută după nume
      include: ['City', 'Region'], // Include relațiile dacă sunt definite
    });
  }

  // Creează un nou hotel
  async create(hotel: Hotel): Promise<Hotel> {
    return this.hotelModel.create(hotel);
  }

  // Actualizează un hotel existent
  async update(id: number, hotel: Partial<Hotel>): Promise<any> {
    return this.hotelModel.update(hotel, { where: { HotelID: id } });
  }

  // Șterge un hotel după ID
  async remove(id: number): Promise<any> {
    return this.hotelModel.destroy({ where: { HotelID: id } });
  }
}
