import { type TemplateDto } from '~/bundles/resume/types/types';

const getRandomTemplates = (templates: TemplateDto[]): TemplateDto[] | [] => {
    const shuffledTemplates = [...templates].sort(() => 0.5 - Math.random());
    return shuffledTemplates.slice(0, 2);
};

export { getRandomTemplates };
