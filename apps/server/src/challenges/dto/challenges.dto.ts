import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
type visibilityOptions = 'private' | 'public';
export class ChallengesDto {
  @ApiProperty() public challenge_title: string = '';
  @ApiPropertyOptional() public description?: string = '';
  @ApiProperty() public challenge_score: number | null = null;
  @ApiProperty() public privacy: visibilityOptions = 'public';
  @ApiPropertyOptional() public id: number;
  @ApiPropertyOptional() public created_at?: string = '';
}
