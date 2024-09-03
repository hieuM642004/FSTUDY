import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FlashCard, FlashCardSchema } from './FlashCardSchema/FlashCard.schema';
import { FlashCardController } from './flashCard.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashCardService } from './flashCard.service';
import { JwtStrategy } from 'src/auth/JWT/jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FlashCard.name, schema: FlashCardSchema },
        ]),
        HttpModule,
    ],
    controllers: [FlashCardController],
    providers: [FlashCardService],
})
export class FlashCardModule {}
