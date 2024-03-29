import {
    type TemplateUpdateItemRequestDto,
    type TemplateUpdateItemResponseDto,
    TemplateErrorMessage,
} from 'shared/build/bundles/templates/templates.js';
import {
    type TemplateGetAllItemResponseDto,
    ContentEncoding,
    ContentType,
    HttpCode,
    HTTPError,
    validateUrl,
} from 'shared/build/index.js';

import { type FileService } from '~/common/files/file.service.js';

import { prettifiedTemplate } from './constants/prettified-template.js';
import { type Template } from './types/template.type';
import {
    type FindAllOptions,
    type ITemplateRepository,
    type ITemplateService,
} from './types/types.js';

class TemplateService implements ITemplateService {
    private templateRepository: ITemplateRepository;
    private fileService: FileService;

    public constructor(
        templateRepository: ITemplateRepository,
        fileService: FileService,
    ) {
        this.fileService = fileService;
        this.templateRepository = templateRepository;
    }

    private async getTemplateWithImageUrl(
        template: Template,
    ): Promise<Template> {
        const isValidImageUrl = validateUrl(template.image);

        if (isValidImageUrl) {
            return template;
        }

        const imageUrl = await this.fileService.getFileUrl(template.image);

        return { ...template, image: imageUrl };
    }

    public async find(id: string): Promise<Template | undefined> {
        const template = await this.templateRepository.find(id);

        if (template) {
            return this.getTemplateWithImageUrl(template);
        }
    }

    public async findAll(options?: FindAllOptions): Promise<{
        items: TemplateGetAllItemResponseDto[];
    }> {
        const templates = await this.templateRepository.findAll(options);

        const templatesWithImageUrl = await Promise.all(
            templates.items.map((template) => {
                return this.getTemplateWithImageUrl(template);
            }),
        );

        return { items: templatesWithImageUrl };
    }

    public async create(payload: { userId: string }): Promise<Template> {
        return await this.templateRepository.create({
            isOwner: true,
            templateSettings: prettifiedTemplate,
            image: 'https://s3-alpha.figma.com/hub/file/1849672021/64b2b02b-08cd-4afd-9f93-e05858d2fffd-cover.png',
            userId: payload.userId,
        });
    }
    public async update(
        templateId: string,
        editedSettings: TemplateUpdateItemRequestDto,
    ): Promise<TemplateUpdateItemResponseDto> {
        const template = await this.templateRepository.find(templateId);

        if (!template) {
            throw new HTTPError({
                message: TemplateErrorMessage.TEMPLATE_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const uploadedImage = await this.fileService.create({
            buffer: editedSettings.image,
            contentEncoding: ContentEncoding.BASE64,
            contentType: ContentType.IMAGE_JPEG,
            key: template.image,
        });

        editedSettings.image = uploadedImage.key;

        return this.templateRepository.update(templateId, editedSettings);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.templateRepository.delete(id);
    }
}

export { TemplateService };
