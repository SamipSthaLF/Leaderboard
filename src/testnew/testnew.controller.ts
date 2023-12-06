import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TestnewService } from "./testnew.service";
import { CreateTestnewDto } from "./dto/create-testnew.dto";
import { UpdateTestnewDto } from "./dto/update-testnew.dto";

@Controller("testnew")
export class TestnewController {
  constructor(private readonly testnewService: TestnewService) {}

  @Post()
  create(@Body() createTestnewDto: CreateTestnewDto) {
    return this.testnewService.create(createTestnewDto);
  }

  @Get()
  findAll() {
    return this.testnewService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.testnewService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateTestnewDto: UpdateTestnewDto) {
    return this.testnewService.update(+id, updateTestnewDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.testnewService.remove(+id);
  }
}
