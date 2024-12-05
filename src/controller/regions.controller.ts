import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RegionsService } from '../service/regions.service';
import { Region } from '../entities/region';

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Get()
  findAll(): Promise<Region[]> {
    return this.regionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Region> {
    return this.regionsService.findOne(id);
  }

  @Post()
  create(@Body() region: Region): Promise<Region> {
    return this.regionsService.create(region);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() region: Partial<Region>): Promise<any> {
    return this.regionsService.update(id, region);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.regionsService.remove(id);
  }
}
