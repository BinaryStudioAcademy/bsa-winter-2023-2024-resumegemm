import { prettifiedTemplate } from '~/bundles/templates/constants/prettified-template.js';
import { testTemplate } from '~/bundles/templates/constants/test-template.js';

const templatesSeed = [
    {
        is_owner: true,
        template_settings: testTemplate,
        name: 'Test template',
    },
    {
        is_owner: true,
        template_settings: testTemplate,
        name: 'Test template 2',
    },
    {
        is_owner: true,
        template_settings: prettifiedTemplate,
        name: 'Test template 3',
    },
    {
        is_owner: false,
        name: 'Test template 3',
    },
    {
        is_owner: false,
        name: 'Test template 4',
    },
];

export { templatesSeed };
