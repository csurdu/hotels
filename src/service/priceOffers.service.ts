import { Injectable } from '@nestjs/common';
import { PriceOffer } from '../entities/price_offers';
import { Hotel } from '../entities/hotel';

@Injectable()
export class PriceOffersService {
  async findByHotel(hotelId: number) {
    return PriceOffer.findAll({ where: { HotelID: hotelId } });
  }

  async create(data: { HotelID: number; Category: string; Price: number }) {
    return PriceOffer.create(data);
  }

  async delete(offerId: number) {
    const offer = await PriceOffer.findByPk(offerId);
    if (!offer) throw new Error('PriceOffer not found');
    await offer.destroy();
    return { message: 'PriceOffer deleted successfully' };
  }
}