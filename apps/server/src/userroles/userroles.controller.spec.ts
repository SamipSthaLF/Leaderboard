import { Test, TestingModule } from '@nestjs/testing';

import { UserrolesService } from '@/userroles/userroles.service';
import { UserrolesController } from '@/userroles/userroles.controller';

describe('UserrolesController', () => {
  let controller: UserrolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserrolesController],
      providers: [UserrolesService],
    }).compile();

    controller = module.get<UserrolesController>(UserrolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
