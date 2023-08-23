import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary.response';

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file!.path,
        {
          public_id: `${Date.now()}__${fileName}`,
          folder: fileName,
        },

        (error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }

  uploadVideo(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file!.path,
        {
          resource_type: 'video',
          public_id: `${Date.now()}__${fileName}`,
          folder: fileName,
        },

        (error, result) => {
          if (error) {
            console.log(error);
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }
}
