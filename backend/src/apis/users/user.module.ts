import { Module } from "@nestjs/common";
import { AppModule } from "src/app.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./UserSchema/user.schema";
import { GoogleDriveUploader } from "src/providers/storage/drive/drive.upload";

@Module({
        imports :[MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
        controllers:[
            UserController
        ],
        providers :[
            UserService,
            GoogleDriveUploader
        ]
})
export  class UserModule{

}