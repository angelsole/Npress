import { IsNotEmpty, IsString, MinLength, IsOptional, NotContains, MaxLength } from 'class-validator';
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
  @MaxLength(200)
  @IsString()
  @IsOptional()
  @NotContains(' ')
  slug: string;
}