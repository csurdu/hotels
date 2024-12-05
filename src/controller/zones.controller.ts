import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ZonesService } from '../service/zones.service';
import { Zone } from '../entities/zones';

@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Get()
  findAll(): Promise<Zone[]> {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Zone> {
    return this.zonesService.findOne(id);
  }

  @Post()
  create(@Body() zone: Zone): Promise<Zone> {
    return this.zonesService.create(zone);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() zone: Partial<Zone>): Promise<any> {
    return this.zonesService.update(id, zone);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.zonesService.remove(id);
  }
}
