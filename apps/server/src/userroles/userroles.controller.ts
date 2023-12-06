import { Post, Body, Controller } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { UserrolesService } from '@/userroles/userroles.service';
import { AssignUserroleDto } from '@/userroles/dto/assign-userrole.dto';

@Controller('userroles')
@ApiBearerAuth()
export class UserrolesController {
  constructor(private readonly userrolesService: UserrolesService) {}

  @Post('/assign')
  async assignUserRole(@Body() assingUserroleDto: AssignUserroleDto) {
    return await this.userrolesService.assignUserRole(assingUserroleDto);
  }
}
