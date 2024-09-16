import { IsOptional } from 'class-validator';

export class UpdateWordReviewDto {
    @IsOptional()
    reviewCount: number;

    @IsOptional()
    reviewInterval: number;

    @IsOptional()
    lastReviewed: Date;

    @IsOptional()
    nextReviewDate: Date;
}
