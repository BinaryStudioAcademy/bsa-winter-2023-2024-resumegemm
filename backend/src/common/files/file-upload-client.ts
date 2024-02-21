import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import  { type IConfig } from 'shared/build';

import { type EnvironmentSchema } from '../config/types/environment-schema.type.js';
import  { type IFileUploadClient } from './interfaces/interfaces.js';

class FileUploadClient implements IFileUploadClient {
  private config: IConfig<EnvironmentSchema>;
  private s3Client: S3Client;

  public constructor(config: IConfig<EnvironmentSchema>) {
    this.config = config;

    const { AWS } = this.config.ENV;

    this.s3Client = new S3Client({
      region: AWS.REGION,
      credentials: {
        secretAccessKey: AWS.SECRET_ACCESS_KEY,
        accessKeyId: AWS.ACCESS_KEY,
      },
    });
  }

  private getFileUrl(key: string): string {
    const { AWS } = this.config.ENV;

    return `https://${AWS.BUCKET_NAME}.s3.${AWS.REGION}.amazonaws.com/${key}`;
  }

  private generateFileKey(extension: string): string {
    return `file_${Date.now().toString()}${extension}`;
  }

  public async upload(fileBuffer: Buffer, extension: string): Promise<string> {
    const { AWS } = this.config.ENV;

    const fileKey = this.generateFileKey(extension);

    const putObjectCommand = new PutObjectCommand({
      Bucket: AWS.BUCKET_NAME,
      Key: fileKey,
      Body: fileBuffer,
    });

    await this.s3Client.send(putObjectCommand);

    return this.getFileUrl(fileKey);
  }
}

export { FileUploadClient };