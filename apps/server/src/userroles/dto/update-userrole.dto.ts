import { PartialType } from '@nestjs/mapped-types';

import { AssignUserroleDto } from './assign-userrole.dto';

export class UpdateUserroleDto extends PartialType(AssignUserroleDto) {}
