import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserrolesService } from './userroles.service';
import { AssignUserroleDto } from './dto/assign-userrole.dto';
import { UpdateUserroleDto } from './dto/update-userrole.dto';

@Controller('userroles')
export class UserrolesController {
  constructor(private readonly userrolesService: UserrolesService) {}

  @Post('/assign')
  async assignUserRole(@Body() assingUserroleDto: AssignUserroleDto) {
    return await this.userrolesService.assignUserRole(assingUserroleDto);
  }

  @Get()
  findAll() {
    return this.userrolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userrolesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserroleDto: UpdateUserroleDto,
  ) {
    return this.userrolesService.update(+id, updateUserroleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userrolesService.remove(+id);
  }
}
