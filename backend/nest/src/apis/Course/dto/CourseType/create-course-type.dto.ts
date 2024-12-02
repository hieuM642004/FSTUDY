import { IsString } from 'class-validator';

export class CreateCourseTypeDto {
  @IsString()
  readonly name: string;
  @IsString()
  readonly description: string;
   slug: string;
  generateSlug() {
    this.slug = this.name.toLowerCase().replace(/ /g, '-');
  }
}
