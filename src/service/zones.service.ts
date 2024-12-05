import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Zone } from '../entities/zones';

@Injectable()
export class ZonesService {
  constructor(
    @InjectModel(Zone)
    private readonly zoneModel: typeof Zone,
  ) {}

  // Găsește toate zonele
  async findAll(): Promise<Zone[]> {
    return this.zoneModel.findAll({
      include: ['Region'], // Include relația cu Region
    });
  }

  // Găsește o zonă după ID
  async findOne(id: number): Promise<Zone> {
    return this.zoneModel.findOne({
      where: { ZoneID: id },
      include: ['Region'], // Include relația cu Region
    });
  }

  // Creează o zonă nouă
  async create(zone: Zone): Promise<Zone> {
    return this.zoneModel.create(zone);
  }

  // Actualizează o zonă existentă
  async update(id: number, zone: Partial<Zone>): Promise<any> {
    return this.zoneModel.update(zone, { where: { ZoneID: id } });
  }

  // Șterge o zonă după ID
  async remove(id: number): Promise<any> {
    return this.zoneModel.destroy({ where: { ZoneID: id } });
  }
}
