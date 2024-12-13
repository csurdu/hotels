import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AirportService } from '../service/airports.service';
import { Airport } from '../entities/airport';

@Controller('airports')
export class AirportController {
  constructor(private readonly airportsService: AirportService) {}

  @Get()
  async findAll() {
    return this.airportsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.airportsService.findOne(+id);
  }

  @Post()
  async create(@Body() data: {
    IATACode: string;
    AirportName: string;
    CityID: number;
    Latitude: number;
    Longitude: number;
  }) {
    return this.airportsService.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Partial<Airport>) {
    return this.airportsService.update(+id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.airportsService.delete(+id);
  }
}
