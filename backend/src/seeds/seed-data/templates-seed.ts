import { TemplateBlockTitles } from '~/common/enums/enums.js';

const templatesSeed = [
    {
        is_owner: true,
        template_settings: {
            [TemplateBlockTitles.Contacts]: { enabled: true },
            [TemplateBlockTitles.Summary]: { enabled: true },
            [TemplateBlockTitles.Experience]: { enabled: true },
            [TemplateBlockTitles.Recommendations]: { enabled: true },
            [TemplateBlockTitles.Tools]: { enabled: true },
            [TemplateBlockTitles.TechStack]: { enabled: true },
            [TemplateBlockTitles.Portfolio]: { enabled: true },
            [TemplateBlockTitles.Languages]: { enabled: true },
            [TemplateBlockTitles.Education]: { enabled: true },
            [TemplateBlockTitles.Socials]: { enabled: true },
        },
    },
    {
        is_owner: true,
        template_settings: {
            [TemplateBlockTitles.Contacts]: { enabled: true },
            [TemplateBlockTitles.Summary]: { enabled: true },
            [TemplateBlockTitles.Experience]: { enabled: true },
            [TemplateBlockTitles.Recommendations]: { enabled: true },
            [TemplateBlockTitles.Tools]: { enabled: true },
            [TemplateBlockTitles.TechStack]: { enabled: true },
            [TemplateBlockTitles.Portfolio]: { enabled: true },
            [TemplateBlockTitles.Languages]: { enabled: true },
            [TemplateBlockTitles.Education]: { enabled: true },
            [TemplateBlockTitles.Socials]: { enabled: true },
        },
    },
    { is_owner: false },
    { is_owner: false },
];

export { templatesSeed };
