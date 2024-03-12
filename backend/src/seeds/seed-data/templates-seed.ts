import { testTemplate } from '~/bundles/templates/constants/test-template.js';

const templatesSeed = [
    {
        is_owner: true,
        template_settings: testTemplate,
    },
    {
        is_owner: true,
        template_settings: testTemplate,
    },
    {
        is_owner: false,
        template_settings: {},
    },
    {
        is_owner: false,
        template_settings: {},
    },
];

export { templatesSeed };
