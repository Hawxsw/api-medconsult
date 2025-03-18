import { IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class DefaultPaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  pageSize?: number = 10;
} 