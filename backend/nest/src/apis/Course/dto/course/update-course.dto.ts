import { Transform } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateCourseDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    slug?: string;

    @IsString()
    @IsOptional()
    thumbnail?: string;

    @IsOptional()
    featured?: boolean;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    display_order?: number;

    @IsString()
    @IsOptional()
    detail_title?: string;

    @IsString()
    @IsOptional()
    detail_type?: string;

    @IsString()
    @IsOptional()
    detail_short_description?: string;

    @IsString()
    @IsOptional()
    detail_content?: string;

    @IsOptional()
    typeCourse?: Types.ObjectId;

    @IsOptional()
    lessons?: Types.ObjectId[];

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    price?: number;

    @Transform(({ value }) => Number(value))
    @IsNumber()
    @IsOptional()
    discount?: number;

    @IsOptional()
    createdAt?: Date;

    @IsOptional()
    updatedAt?: Date;

    @IsString()
    @IsOptional()
    createdBy?: string;

    @IsString()
    @IsOptional()
    updatedBy?: string;
}
