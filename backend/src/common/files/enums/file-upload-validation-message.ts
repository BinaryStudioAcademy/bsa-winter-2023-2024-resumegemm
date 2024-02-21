
import { FileUploadValidationRule } from './file-upload-validation-rule.js';

const FileUploadValidationMessage = {
  INCORRECT_FILE_TYPE: `File extension should be one of ${FileUploadValidationRule.UPLOAD_FILE_CONTENT_TYPES.join(
    ', ',
  )}.`,
  FILE_TOO_LARGE: `File size should be less than ${
    FileUploadValidationRule.MAXIMUM_FILE_SIZE
  } MB.`,
} as const;

export { FileUploadValidationMessage };