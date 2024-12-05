import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from '../entities/region';

@Injectable()
export class RegionsService {
  constructor(
    @InjectModel(Region)
    private readonly regionModel: typeof Region,
  ) {}

  // Găsește toate regiunile
  async findAll(): Promise<Region[]> {
    return this.regionModel.findAll({
      include: ['hotels', 'zones'], // Include relațiile (asociațiile)
    });
  }

  // Găsește o regiune după ID
  async findOne(id: number): Promise<Region> {
    return this.regionModel.findOne({
      where: { RegionID: id },
      include: ['hotels', 'zones'], // Include relațiile (asociațiile)
    });
  }

  // Creează o nouă regiune
  async create(region: Region): Promise<Region> {
    return this.regionModel.create(region);
  }

  // Actualizează o regiune existentă
  async update(id: number, region: Partial<Region>): Promise<any> {
    return this.regionModel.update(region, { where: { RegionID: id } });
  }

  // Șterge o regiune după ID
  async remove(id: number): Promise<any> {
    return this.regionModel.destroy({ where: { RegionID: id } });
  }
}
