import { TemplateBlockTitles, TemplateItemTags } from '../enums/enums.js';
import { type TemplateSettings } from '../types/types.js';

const testTemplate: TemplateSettings = {
    containers: [
        {
            id: 'personalInfoContainer',
            name: 'Personal Information',
            blocks: [
                {
                    id: 'profileBlock',
                    name: TemplateBlockTitles.Profile,
                    items: [
                        {
                            id: 'avatar',
                            name: 'Avatar',
                            tagName: TemplateItemTags.IMAGE,
                            content:
                                'https://i.pinimg.com/564x/29/55/59/295559e87b67fde4bbd5d5049d67e678.jpg',
                            styles: {
                                width: '75px',
                                height: '75px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                objectFit: 'cover',
                            },
                        },
                        {
                            id: 'firstName',
                            name: 'First Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'John Doe',
                            styles: {
                                color: 'black',
                                fontSize: '30px',
                                fontWeight: 'bold',
                            },
                        },
                        {
                            id: 'profession',
                            name: 'Profession',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Web Developer',
                            styles: { fontWeight: 'bold', fontSize: '14px' },
                        },
                    ],
                    styles: {
                        display: 'grid',
                        alignItems: 'center',
                        padding: '5px',
                        gridColumn: '1 / 3',
                        gridTemplateColumns: '1fr 1fr',
                    },
                },
                {
                    id: 'contactBlock',
                    name: TemplateBlockTitles.Contacts,
                    items: [
                        {
                            id: 'phoneNumber',
                            name: 'Phone',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '+123 456 7890',
                            styles: {},
                        },
                        {
                            id: 'country',
                            name: 'Country',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Greece',
                            styles: {},
                        },
                        {
                            id: 'email',
                            name: 'Email',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'three@gmail.com',
                            styles: {},
                        },
                    ],
                    styles: {
                        padding: '5px',
                        marginRight: '20px',
                    },
                },

                {
                    id: 'summaryBlock',
                    name: TemplateBlockTitles.Certification,
                    items: [
                        {
                            id: 'summaryTitleItem',
                            name: 'Summary Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Summary',
                            styles: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            id: 'summaryItem',
                            name: 'Summary',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content:
                                'Experienced Web Developer adept in all stages of advanced web development. Knowledgeable in user interface, testing, and debugging processes. Bringing forth expertise in design, installation, testing, and maintenance of web systems. Equipped with a diverse and promising skill-set. Proficient in an assortment of technologies, including JavaScript, React, Node.js, MongoDB.',
                            styles: {
                                textAlign: 'justify',
                            },
                        },
                    ],
                    styles: {
                        borderRadius: '10px',
                        backgroundColor: '#DDDDDD',
                        padding: '10px',
                    },
                },
            ],
            styles: {
                background: '#ffffff',
                gridColumn: '1 / 3',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                borderBottom: '1px solid #EEEEEE',
                paddingBottom: '10px',
            },
        },
        {
            id: 'mainContainer',
            name: 'Main',
            blocks: [
                {
                    id: 'expBlock1',
                    name: TemplateBlockTitles.Experience,
                    items: [
                        {
                            id: 'jobTitle',
                            name: 'Job Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Software Engineer',
                            styles: { fontSize: '20px', fontWeight: 'bold' },
                        },
                    ],
                    styles: {},
                },
                {
                    id: 'educationBlock1',
                    name: TemplateBlockTitles.Education,
                    items: [
                        {
                            id: 'degree',
                            name: 'Degree',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Master Degree',
                            styles: { fontSize: '20px', fontWeight: 'bold' },
                        },
                        {
                            id: 'institution',
                            name: 'University',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'University of Computer Science',
                            styles: {
                                color: 'white',
                                backgroundColor: 'black',
                                fontWeight: 'bold',
                                padding: '4px',
                            },
                        },
                    ],
                    styles: {},
                },
            ],
            styles: {
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            },
        },
        {
            id: 'asideContainer',
            name: 'Aside',
            blocks: [
                {
                    id: 'skillsBlock',
                    name: TemplateBlockTitles.Experience,
                    items: [
                        {
                            id: 'skillsTitleItem',
                            name: 'Skills Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Skills',
                            styles: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            id: 'skillsItem1',
                            name: 'Skills',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '• Communication',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: {
                        backgroundColor: '#EEEEEE',
                        padding: '5px',
                        borderRadius: '10px',
                    },
                },
                {
                    id: 'languagesBlock',
                    name: TemplateBlockTitles.Languages,
                    items: [
                        {
                            id: 'language',
                            name: 'Languages Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'French',
                            styles: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                    ],
                    styles: {
                        backgroundColor: '#EEEEEE',
                        padding: '5px',
                        borderRadius: '10px',
                    },
                },
                {
                    id: 'recommendationsBlock',
                    name: TemplateBlockTitles.Divider,
                    items: [
                        {
                            id: 'recommendationsTitleItem',
                            name: 'Recommendations Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Recommendations',
                            styles: {
                                fontSize: '20px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            },
                        },
                        {
                            id: 'recommendationsItem1',
                            name: 'Recommendations',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '• "John is a great web developer"',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'recommendationsItem2',
                            name: 'Recommendations',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '• "He is very professional"',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: {
                        backgroundColor: '#EEEEEE',
                        padding: '5px',
                        borderRadius: '10px',
                    },
                },
            ],
            styles: {
                background: '#ffffff',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
            },
        },
    ],
    styles: {
        fontFamily: 'Trebuchet MS, sans-serif',
        fontSize: '12px',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '2fr 1fr',
        gridTemplateRows: 'auto 1fr',
        gap: '20px',
    },
};

export { testTemplate };
