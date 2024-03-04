import { config } from '../config/config.js';
import { FileService } from './file.service.js';
import { FileUploadClient } from './file-upload-client.js';

const fileUploadClient = new FileUploadClient(config);
const fileService = new FileService(fileUploadClient);

export { fileService };
