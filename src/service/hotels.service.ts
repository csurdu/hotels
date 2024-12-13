import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hotel } from '../entities/hotel';
import {PriceOffer} from '../entities/price_offers'
import { Airport } from '../entities/airport';


@Injectable()
export class HotelsService {
  constructor(
    @InjectModel(Hotel) // Injectează modelul Sequelize
    private readonly hotelModel: typeof Hotel,
  ) {}

  // Găsește toate hotelurile
  async findAll(): Promise<Hotel[]> {
    return this.hotelModel.findAll({
      include: ['City', 'Region','PriceOffers'], // Include relațiile dacă sunt definite
    });
  }

  // Găsește un singur hotel după ID
  async findOne(id: number): Promise<Hotel> {
    return this.hotelModel.findOne({
      where: { HotelID: id },
      include: ['City', 'Region','PriceOffers'], // Include relațiile dacă sunt definite
    });
  }
  // Găsește un hotel după nume
  async findByName(name: string): Promise<Hotel> {
    return this.hotelModel.findOne({
      where: { HotelName: name }, // Caută după nume
      include: ['City', 'Region','PriceOffers'], // Include relațiile dacă sunt definite
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

  async createHotelWithOffers(createHotelDto: any) {
    const { PriceOffers, ...hotelData } = createHotelDto; // Extragem PriceOffers din body
    const hotel = await Hotel.create(hotelData);
  
    // Creează oferte de preț dacă sunt furnizate
    if (PriceOffers && PriceOffers.length > 0) {
      await PriceOffer.bulkCreate(
        PriceOffers.map((offer) => ({ ...offer, HotelID: hotel.HotelID }))
      );
    }
  
    return hotel;
  }

  async findBestOffers(airportId: number, maxDistanceKm: number): Promise<any> {
    // Găsește aeroportul specificat
    const airport = await Airport.findByPk(airportId);
    if (!airport) {
      throw new Error('Airport not found');
    }
  
    // Toate hotelurile cu ofertele lor de preț
    const hotels = await Hotel.findAll({ include: ['PriceOffers'] });
  
    // Calcul distanță simplificat (fără curba Pământului)
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // raza Pământului în km
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };
  
    // Creează lista cu ofertele cele mai bune
    const bestOffers = [];
  
    for (const hotel of hotels) {
      const distance = calculateDistance(
        airport.Latitude,
        airport.Longitude,
        hotel.Latitude,
        hotel.Longitude
      );
  
      if (distance <= maxDistanceKm) {
        // Adaugă fiecare ofertă a hotelului în lista rezultatelor
        for (const offer of hotel.PriceOffers) {
          bestOffers.push({
            OfferID: offer.OfferID,
            Price: offer.Price,
            Category: offer.Category,
            HotelName: hotel.HotelName,
            Address: hotel.Address,
            Distance: distance,
          });
        }
      }
    }
  
    // Sortează ofertele după preț (crescător) și distanță (crescător)
    return bestOffers.sort((a, b) => a.Price - b.Price || a.Distance - b.Distance);
  }
  

}
