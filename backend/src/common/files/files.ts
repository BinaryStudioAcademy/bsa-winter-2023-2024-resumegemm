import { config } from '../config/config.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';
import { FileUploadClient } from './file-upload-client.js';

const fileUploadClient = new FileUploadClient(config);
const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileRepository, fileUploadClient);

export { fileService };
