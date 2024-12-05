import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CitiesService } from '../service/cities.service';
import { City } from '../entities/city';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Get()
  findAll(): Promise<City[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<City> {
    return this.citiesService.findOne(id);
  }

  @Post()
  create(@Body() city: City): Promise<City> {
    return this.citiesService.create(city);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() city: Partial<City>): Promise<any> {
    return this.citiesService.update(id, city);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.citiesService.remove(id);
  }
}
