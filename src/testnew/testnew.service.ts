import { Injectable } from '@nestjs/common';
import { CreateTestnewDto } from './dto/create-testnew.dto';
import { UpdateTestnewDto } from './dto/update-testnew.dto';

@Injectable()
export class TestnewService {
  create(createTestnewDto: CreateTestnewDto) {
    return 'This action adds a new testnew';
  }

  findAll() {
    return `This action returns all testnew`;
  }

  findOne(id: number) {
    return `This action returns a #${id} testnew`;
  }

  update(id: number, updateTestnewDto: UpdateTestnewDto) {
    return `This action updates a #${id} testnew`;
  }

  remove(id: number) {
    return `This action removes a #${id} testnew`;
  }
}
