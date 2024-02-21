import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from 'shared/build/bundles/templates/templates.js';

interface ITemplateService {
    editTemplateSettings(
        id: string,
        data: TemplateEditRequestDto,
    ): Promise<TemplateEditResponseDto>;
}

export { type ITemplateService };
