import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GroupsService } from '../service/groups.service';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async findAll() {
    return this.groupsService.findAll();
  }

  @Post()
  async create(@Body() data: { GroupName: string; Description?: string }) {
    return this.groupsService.create(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.groupsService.delete(+id);
  }
  @Post(':groupId/hotels/:hotelId')
  async addHotelToGroup(@Param('groupId') groupId: string, @Param('hotelId') hotelId: string) {
    return this.groupsService.addHotelToGroup(+groupId, +hotelId);
  }
}