import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @Post("uploadImage/:id")
    @UseInterceptors(FileInterceptor("file"))
    async uploadImage(
        @Param("id", ParseUUIDPipe) productId: string,
        @UploadedFile(new ParseFilePipe({
            validators:[
                new MaxFileSizeValidator({
                    maxSize: 200000,
                    message: "Supera el máximo de 200kb"
                }),
                new FileTypeValidator({
                    fileType: /(.jpg | .jpeg | .png | .svg | .webp | .tiff | .avif )/ 
                })
            ]
        })) file: Express.Multer.File){
        return await this.fileUploadService.uploadImage(file,productId)
    }

}
