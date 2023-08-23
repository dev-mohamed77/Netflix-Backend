import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: () =>
    cloudinary.config({
      cloud_name: 'dmnp4xkbs',
      api_key: '745752674113993',
      api_secret: 'ynnkKkE992UkqUGlvheicool_Co',
    }),
};
