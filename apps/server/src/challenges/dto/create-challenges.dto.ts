import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export type visibilityOptions = 'private' | 'public';

export class CreateChallengeDto {
  @ApiProperty({ default: 'KPI' }) public title: string;

  @ApiPropertyOptional({ default: 'User needs to fill' })
  public description?: string;

  @ApiProperty({ default: 1 }) public points: number;

  @ApiProperty({ default: 'public' }) public privacy: visibilityOptions;

  @ApiProperty({ default: 1 }) public author_id: number;
}
