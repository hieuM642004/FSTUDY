import { Module } from "@nestjs/common";
import { GoogleSheetsController } from "./sheet.controller";

@Module({
    controllers: [GoogleSheetsController],
    providers: [],
    exports: []
})

export class SheetModule {}