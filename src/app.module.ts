import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsController } from './controller/hotels.controller';
import { HotelsService } from './service/hotels.service';
import { Hotel } from './entities/hotel';
import { City } from './entities/city';
import { Region } from './entities/region';
import { Zone } from './entities/zones';
import { Group } from './entities/groups';
import { PriceOffer } from './entities/price_offers';
import { CitiesController } from './controller/cities.controller';
import { ZonesController } from './controller/zones.controller';
import { RegionsController } from './controller/regions.controller';
import { CitiesService } from './service/cities.service';
import { ZonesService } from './service/zones.service';
import { RegionsService } from './service/regions.service';
import { GroupsController } from './controller/groups.controller';
import { GroupsService } from './service/groups.service';
import { PriceOffersController } from './controller/priceOffers.controller';
import { PriceOffersService } from './service/priceOffers.service';
import { AirportService } from './service/airports.service';
import { AirportController } from './controller/airports.controller';

import { Airport } from './entities/airport';
import { ArrayOverlap } from 'typeorm';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'student',
      database: 'hotels_db',
      models: [Hotel, City, Region, Zone,PriceOffer,Group,Airport],
      autoLoadModels: true,
      synchronize: true, 
    }),
    SequelizeModule.forFeature([Hotel, City, Region, Zone, PriceOffer,Group,Airport]),
  ],
  controllers: [HotelsController,CitiesController,ZonesController,RegionsController,GroupsController,PriceOffersController,AirportController],
  providers: [HotelsService,CitiesService,ZonesService,RegionsService,GroupsService,PriceOffersService,AirportService],
})
export class AppModule {}
