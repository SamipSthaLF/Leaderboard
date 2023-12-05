import { Test, TestingModule } from '@nestjs/testing';

import { RolesService } from '@/roles/roles.service';
import { RolesController } from '@/roles/roles.controller';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [RolesService],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
