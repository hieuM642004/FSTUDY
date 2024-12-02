import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    title: string;
    slug: string;


    @Transform(({ value }) => value === 'true')
    @IsOptional()
    featured?: boolean;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()

    display_order: number;

    @IsString()
    @IsNotEmpty()
    detail_title: string;

    @IsString()
    @IsNotEmpty()
    detail_type: string;

    @IsString()
    @IsNotEmpty()
    detail_short_description: string;

    @IsString()
    @IsNotEmpty()
    detail_content: string;

    @IsOptional()
    typeCourse?: Types.ObjectId;

    @IsOptional()
    lessons?: Types.ObjectId[];

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsNotEmpty()
    discount: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;

    @IsString()
    @IsNotEmpty()
    createdBy: string;

    @IsString()
    @IsNotEmpty()
    updatedBy: string;

 
}
