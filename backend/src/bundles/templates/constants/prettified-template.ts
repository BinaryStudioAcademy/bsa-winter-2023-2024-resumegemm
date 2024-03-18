import { type TemplateSettings } from 'shared/build/index.js';

import { TemplateBlockTitles, TemplateItemTags } from '../enums/enums.js';

const prettifiedTemplate: TemplateSettings = {
    containers: [
        {
            id: 'titleContainer',
            name: 'Overview',
            blocks: [
                {
                    id: 'profileBlock',
                    name: TemplateBlockTitles.Profile,
                    items: [
                        {
                            id: 'firstName',
                            name: 'First Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'TAYLOR',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '2rem',
                                letterSpacing: '2px',
                                margin: '0',
                            },
                        },
                        {
                            id: 'avatar',
                            name: 'Avatar',
                            tagName: TemplateItemTags.IMAGE,
                            content:
                                'https://i.pinimg.com/564x/29/55/59/295559e87b67fde4bbd5d5049d67e678.jpg',
                            styles: {
                                width: '65px',
                                height: '65px',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                objectFit: 'cover',
                                position: 'absolute',
                                right: '0',
                                top: '0',
                                flex: '1',
                            },
                        },
                        {
                            id: 'lastName',
                            name: 'Last Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'COOK',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '2rem',
                                letterSpacing: '2px',
                                margin: '0',
                            },
                        },
                        {
                            id: 'profession',
                            name: 'Profession',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Software Developer',
                            styles: {
                                margin: '20px 0',
                                fontSize: '1rem',
                                color: '#828ba2',
                            },
                        },
                    ],
                    styles: {
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        position: 'relative',
                    },
                },
            ],
            styles: {
                borderBottom: '2px solid #c7cacf',
            },
        },
        {
            id: 'mainContainer',
            name: 'Main',
            blocks: [
                {
                    id: 'summaryBlock',
                    name: TemplateBlockTitles.Summary,
                    items: [
                        {
                            id: 'country',
                            name: 'Country',
                            placeholder: 'COUNTRY',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Italy',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'city',
                            name: 'City',
                            placeholder: 'CITY',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Milan',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'phoneNumber',
                            name: 'Phone',
                            placeholder: 'PHONE',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '+391234590',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'email',
                            name: 'Email',
                            placeholder: 'EMAIL',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'johndoe@gmail.com',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'skillName',
                            name: 'Skill',
                            placeholder: 'TECHNICAL SKILL',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'TypeScript',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                    ],
                    styles: {
                        flex: '0 25%',
                        height: 'fit-content',
                        margin: '1rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    },
                },

                {
                    id: 'Divider',
                    name: TemplateBlockTitles.Divider,
                    items: [
                        {
                            id: 'divider',
                            name: 'Divider',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '',
                            styles: {},
                        },
                    ],
                    styles: {
                        width: '2px',
                        backgroundColor: '#c7cacf',
                    },
                },
                {
                    id: 'educationBlock1',
                    name: TemplateBlockTitles.Education,
                    items: [
                        {
                            id: 'institution',
                            name: 'University',
                            placeholder: 'UNIVERSITY',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'University of Computer Science',
                            styles: {
                                color: 'white',
                                backgroundColor: 'black',
                                fontWeight: 'bold',
                                padding: '4px',
                            },
                        },
                        {
                            id: 'degree',
                            name: 'Degree',
                            placeholder: 'DEGREE',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Master Degree',
                            styles: { fontSize: '15px' },
                        },
                        {
                            id: 'description',
                            name: 'Description',
                            placeholder: 'DESCRIPTION',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content:
                                'Beyond academics, the University of Computer Science fosters a vibrant campus community characterized by diversity, inclusion, and collaboration. Students have ample opportunities to engage in extracurricular activities, clubs, and events, enabling them to develop leadership skills',
                            styles: {
                                fontWeight: 'bold',
                                padding: '4px',
                            },
                        },
                    ],
                    styles: {
                        flex: '1',
                        margin: '1rem 0',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                    },
                },
            ],
            styles: {
                display: 'flex',
                gap: '10px',
            },
        },
        {
            id: 'footerContainer',
            name: 'Footer',
            blocks: [
                {
                    id: 'footerBlock',
                    name: TemplateBlockTitles.Languages,
                    items: [
                        {
                            id: 'language',
                            name: 'Languages',
                            placeholder: 'Primary Language',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'English',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                    ],
                    styles: {
                        marginRight: 'auto',
                        marginTop: '5px',
                    },
                },
                {
                    id: 'certification',
                    name: TemplateBlockTitles.CERTIFICATION,
                    items: [
                        {
                            id: 'certificationName',
                            name: 'Certification Name',
                            placeholder: 'CERTIFICATION',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content:
                                'AWS Certified Solutions Architect (AWS-CSA)',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '0.75rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'authority',
                            name: 'Authority',
                            placeholder: 'AUTHORITY',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Amazon Web Services (AWS)',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '0.75rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                    ],
                    styles: {
                        display: 'flex',
                        flexDirection: 'column',
                        margin: 'auto',
                        marginTop: '0.4rem',
                    },
                },
            ],
            styles: {
                display: 'flex',
                gap: '10px',
                borderTop: '2px solid #c7cacf',
            },
        },
    ],
    styles: {
        fontFamily: 'Trebuchet MS, sans-serif',
        fontSize: '12px',
        padding: '20px',
        display: 'grid',
        gridTemplateColumns: '1fr',
        backgroundColor: '#fff',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    },
};

export { prettifiedTemplate };
