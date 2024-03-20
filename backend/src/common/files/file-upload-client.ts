import crypto from 'node:crypto';

import {
    type DeleteObjectCommandOutput,
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { type IConfig, ContentEncoding } from 'shared/build/index.js';

import { type EnvironmentSchema } from '../config/types/environment-schema.type.js';
import { type IFileUploadClient } from './interfaces/interfaces.js';
import { type FileUploadRequestDto } from './types/file-upload-request-dto.type.js';
import { type FileUploadResponseDto } from './types/file-upload-response-dto-type.js';

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

    public async getFileUrl(key: string): Promise<string> {
        const {
            AWS: { BUCKET_NAME },
        } = this.config.ENV;

        const command = new GetObjectCommand({
            Bucket: BUCKET_NAME,
            Key: key,
        });

        return await getSignedUrl(this.s3Client, command);
    }

    private generateFileKey(): string {
        const uuid = crypto.randomUUID();

        return `file_${uuid}`;
    }

    public async upload({
        buffer,
        contentType,
        contentEncoding,
        key,
    }: FileUploadRequestDto): Promise<FileUploadResponseDto> {
        const { AWS } = this.config.ENV;

        const fileKey = key ?? this.generateFileKey();

        let body = buffer;

        if (contentEncoding === ContentEncoding.BASE64) {
            const regexSearchValue = /^data:image\/\w+;base64,/;

            const parsedBase64 = (buffer as string).replace(
                regexSearchValue,
                '',
            );

            body = Buffer.from(parsedBase64, ContentEncoding.BASE64);
        }

        const putObjectCommand = new PutObjectCommand({
            Bucket: AWS.BUCKET_NAME,
            Key: fileKey,
            Body: body,
            ContentType: contentType,
            ContentEncoding: contentEncoding,
        });

        await this.s3Client.send(putObjectCommand);

        const url = await this.getFileUrl(fileKey);

        return { key: fileKey, url };
    }

    public async delete(key: string): Promise<DeleteObjectCommandOutput> {
        const { AWS } = this.config.ENV;

        const deleteObjectCommand = new DeleteObjectCommand({
            Key: key,
            Bucket: AWS.BUCKET_NAME,
        });

        return await this.s3Client.send(deleteObjectCommand);
    }
}

export { FileUploadClient };
