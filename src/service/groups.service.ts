import { Injectable } from '@nestjs/common';
import { Group } from '../entities/groups';
import { Hotel } from '../entities/hotel';

@Injectable()
export class GroupsService {
  async findAll() {
    return Group.findAll({ include: { all: true } });
  }

  async create(data: { GroupName: string; Description?: string }) {
    return Group.create(data);
  }

  async delete(groupId: number) {
    const group = await Group.findByPk(groupId);
    if (!group) throw new Error('Group not found');
    await group.destroy();
    return { message: 'Group deleted successfully' };
  }

  async addHotelToGroup(groupId: number, hotelId: number) {
    const group = await Group.findByPk(groupId);
    if (!group) {
      throw new Error('Group not found');
    }
  
    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      throw new Error('Hotel not found');
    }
  
    hotel.GroupID = groupId;
    await hotel.save();
  
    return { message: `Hotel ${hotel.HotelName} has been added to Group ${group.GroupName}` };
  }
}