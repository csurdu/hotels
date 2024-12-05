import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common'; // Adaugă UseGuards aici
import { HotelsService } from '../service/hotels.service';
import { Hotel } from '../entities/hotel';
import { AuthGuard } from '../auth/auth.guard'; 
import { Query } from '@nestjs/common';

@Controller('hotels')
export class HotelsController {
  constructor(private readonly hotelsService: HotelsService) {}

  @Get('public')
  getPublicData(): { message: string } {
    return { message: 'This is a public route, accessible to everyone.' };
  }

  @UseGuards(AuthGuard) 
  @Get('protected')
  getProtectedData(): { message: string } {
    return { message: 'This is a protected route, accessible only with a valid token.' };
  }

  @Get()
  findAll(): Promise<Hotel[]> {
    return this.hotelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Hotel> {
    return this.hotelsService.findOne(id);
  }

  @Get('search/by-name')
  findByName(@Query('name') name: string): Promise<Hotel> {
    if (!name) {
      throw new Error('Hotel name is required');
    }
    return this.hotelsService.findByName(name);
  }
  

  @Post()
  create(@Body() hotel: Hotel): Promise<Hotel> {
    return this.hotelsService.create(hotel);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() hotel: Partial<Hotel>): Promise<any> {
    return this.hotelsService.update(id, hotel);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<any> {
    return this.hotelsService.remove(id);
  }
}
