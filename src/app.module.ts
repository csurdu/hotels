import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HotelsController } from './controller/hotels.controller';
import { HotelsService } from './service/hotels.service';
import { Hotel } from './entities/hotel';
import { City } from './entities/city';
import { Region } from './entities/region';
import { Zone } from './entities/zones';
import { CitiesController } from './controller/cities.controller';
import { ZonesController } from './controller/zones.controller';
import { RegionsController } from './controller/regions.controller';
import { CitiesService } from './service/cities.service';
import { ZonesService } from './service/zones.service';
import { RegionsService } from './service/regions.service';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'student',
      database: 'hotels_db',
      models: [Hotel, City, Region, Zone],
      autoLoadModels: true,
      synchronize: true, 
    }),
    SequelizeModule.forFeature([Hotel, City, Region, Zone]),
  ],
  controllers: [HotelsController,CitiesController,ZonesController,RegionsController],
  providers: [HotelsService,CitiesService,ZonesService,RegionsService],
})
export class AppModule {}
