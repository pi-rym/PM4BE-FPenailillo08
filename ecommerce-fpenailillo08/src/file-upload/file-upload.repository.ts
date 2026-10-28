import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 } from 'cloudinary';
import toStream = require('buffer-to-stream'); 
//buffer-to-stream es el que envia mi imagen de mi RAM en partes a cloudinary
  
@Injectable()
export class FileUploadRepository {
	async uploadImage(
		file: Express.Multer.File
	): Promise<UploadApiResponse> { //UploadApiResponse => Formato de objeto que trae de Cloudinary
		return new Promise((resolve, reject) => {
			const upload = v2.uploader.upload_stream(
				{ resource_type: 'auto' },
				(error, result) => { //error=> CAJA ROJA & result => CAJA VERDE
					if (error || !result) {
			            reject(
				            error || new Error(
					            'Error al cargar imagen en Cloudinary'));
					} else {
						resolve(result);
					}
				},
			);
			toStream(file.buffer).pipe(upload);
		});
	}
}

