import { Test, TestingModule } from '@nestjs/testing';
import { TestnewController } from './testnew.controller';
import { TestnewService } from './testnew.service';

describe('TestnewController', () => {
  let controller: TestnewController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestnewController],
      providers: [TestnewService],
    }).compile();

    controller = module.get<TestnewController>(TestnewController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
