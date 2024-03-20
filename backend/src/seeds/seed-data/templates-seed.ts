import { prettifiedTemplate } from '~/bundles/templates/constants/prettified-template.js';
import { testTemplate } from '~/bundles/templates/constants/test-template.js';

const templatesSeed = [
    {
        is_owner: true,
        template_settings: testTemplate,
        name: 'Web Developer',
        image: 'https://i.imgur.com/AL5xDql.png',
    },
    {
        is_owner: true,
        template_settings: prettifiedTemplate,
        name: 'Software Developer',
        image: 'https://i.imgur.com/eh44KC0.png',
    },
    {
        is_owner: true,
        template_settings: testTemplate,
        name: 'Web Developer',
        image: 'https://i.imgur.com/AL5xDql.png',
    },
    {
        is_owner: true,
        template_settings: prettifiedTemplate,
        name: 'Software Developer',
        image: 'https://i.imgur.com/eh44KC0.png',
    },
];

export { templatesSeed };
