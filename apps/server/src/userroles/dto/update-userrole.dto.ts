import { PartialType } from '@nestjs/mapped-types';

import { AssignUserroleDto } from '@/userroles/dto/assign-userrole.dto';

export class UpdateUserroleDto extends PartialType(AssignUserroleDto) {}
