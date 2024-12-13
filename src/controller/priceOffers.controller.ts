import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { PriceOffersService } from '../service/priceOffers.service';

@Controller('price-offers')
export class PriceOffersController {
  constructor(private readonly priceOffersService: PriceOffersService) {}

  @Get('/hotel/:hotelId')
  async findByHotel(@Param('hotelId') hotelId: string) {
    return this.priceOffersService.findByHotel(+hotelId);
  }

  @Post()
  async create(@Body() data: { HotelID: number; Category: string; Price: number }) {
    return this.priceOffersService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.priceOffersService.delete(+id);
  }
}