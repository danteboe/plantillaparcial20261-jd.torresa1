import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  caption!: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  likes?: number;
}
