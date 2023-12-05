import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export type visibilityOptions = 'private' | 'public';
export class ChallengesDto {
  @ApiProperty() public title: string;
  @ApiPropertyOptional() public description?: string;
  @ApiProperty() public points: number;
  @ApiProperty() public privacy: visibilityOptions;
  @ApiProperty() public author_id: number;
  @ApiPropertyOptional() public created_at?: string;
  @ApiPropertyOptional() public updated_at?: string;
}
