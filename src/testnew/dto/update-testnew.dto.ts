import { PartialType } from "@nestjs/mapped-types";
import { CreateTestnewDto } from "./create-testnew.dto";

export class UpdateTestnewDto extends PartialType(CreateTestnewDto) {}
