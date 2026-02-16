import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AnalyzeQueryDto {
  @IsString()
  @IsNotEmpty()
  city!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsOptional()
  @IsString()
  @IsIn(['urban', 'periurban', 'rural'])
  zone?: string;
}
