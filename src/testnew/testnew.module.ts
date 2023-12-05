import { Module } from '@nestjs/common';
import { TestnewService } from './testnew.service';
import { TestnewController } from './testnew.controller';

@Module({
  controllers: [TestnewController],
  providers: [TestnewService],
})
export class TestnewModule {}
