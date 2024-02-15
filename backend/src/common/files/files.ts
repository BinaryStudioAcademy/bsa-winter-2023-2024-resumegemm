import { config } from '../config/config';
import { logger } from '../logger/logger';
import { FileModel } from './file.model';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';
import { FileUploadClient } from './file-upload-client';

const fileUploadClient = new FileUploadClient(config);
const imageRepository = new FileRepository(FileModel);
const imageService = new FileService(imageRepository, fileUploadClient);

export { imageService };