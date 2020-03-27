import { IsNotEmpty, IsString, MinLength, IsOptional, NotContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  @IsString()
  @IsOptional()
  @NotContains(' ')
  slug: string;
}