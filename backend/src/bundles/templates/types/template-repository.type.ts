import {
    type TemplateEditRequestDto,
    type TemplateEditResponseDto,
} from 'shared/build/bundles/templates/templates.js';

interface ITemplateRepository {
    edit(
        id: string,
        data: TemplateEditRequestDto,
    ): Promise<TemplateEditResponseDto>;
}

export { type ITemplateRepository };
