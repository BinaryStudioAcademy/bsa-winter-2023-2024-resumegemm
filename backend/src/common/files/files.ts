import { config } from '../config/config';
import { FileService } from './file.service';
import { FileUploadClient } from './file-upload-client';

const fileUploadClient = new FileUploadClient(config);
const fileService = new FileService(fileUploadClient);

export { fileService };