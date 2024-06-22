import { IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly title: string;
  @IsString()
  readonly content: string;
  @IsString()
  readonly avatar: string;
  @IsString()
  readonly status: string;
  readonly slug: string;

}
