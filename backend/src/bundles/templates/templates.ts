import { fileService } from '~/common/files/files.js';
import { logger } from '~/common/logger/logger.js';

import { TemplateController } from './template.controller.js';
import { TemplateModel } from './template.model.js';
import { TemplateRepository } from './template.repository.js';
import { TemplateService } from './template.service.js';

const templateRepository = new TemplateRepository(TemplateModel);

const templateService = new TemplateService(templateRepository, fileService);

const templateController = new TemplateController(logger, templateService);

export { templateController, templateRepository, templateService };
export { TemplateModel } from './template.model.js';
