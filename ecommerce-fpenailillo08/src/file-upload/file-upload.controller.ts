import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../modules/auth/auth.guard';
import { RolesGuard } from '../modules/auth/roles.guard';
import { Roles } from '../decorators/roles.decorators';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Role } from '../common/roles.enum';

@Controller('files')
export class FileUploadController {
    constructor(private readonly fileUploadService: FileUploadService){}

    @ApiBearerAuth()
    @ApiOperation({summary: "Cargar imagen para un producto"})
    @ApiParam({name: "id", description: "ID del producto", type: String})
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema:{
            type: "object",
            properties:{
                file:{
                    type: "string",
                    format: "binary"
                }
            }
        }
    })
    @Post("uploadImage/:id")
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
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
                    fileType: /^image\/(jpeg|png|svg\+xml|webp|tiff|avif)$/
                })
            ]
        })) file: Express.Multer.File){
        return await this.fileUploadService.uploadImage(file,productId)
    }

}
