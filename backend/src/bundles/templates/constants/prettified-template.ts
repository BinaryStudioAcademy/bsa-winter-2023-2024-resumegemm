import { type TemplateSettings } from 'shared/build/index.js';

import { TemplateBlockTitles, TemplateItemTags } from '../enums/enums.js';

const prettifiedTemplate: TemplateSettings = {
    containers: [
        {
            id: 'titleContainer',
            name: 'Overview',
            blocks: [
                {
                    id: 'personalInformationBlock',
                    name: TemplateBlockTitles.Profile,
                    items: [
                        {
                            id: 'avatar',
                            name: 'Avatar',
                            tagName: TemplateItemTags.IMAGE,
                            content: 'https://i.imgur.com/kZypAmC.png',
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
                            id: 'firstName',
                            name: 'First Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'TAYLOR',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '1.5rem',
                                letterSpacing: '2px',
                                margin: '0',
                            },
                        },
                        {
                            id: 'lastName',
                            name: 'Last Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'COOK',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '1.5rem',
                                letterSpacing: '2px',
                                margin: '0',
                            },
                        },
                        {
                            id: 'email',
                            name: 'Email',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'taylorcook@gmail.com',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '1rem',
                                letterSpacing: '1px',
                                margin: '0',
                                color: '#828ba2',
                            },
                        },
                        {
                            id: 'profession',
                            name: 'Profession',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'JavaScript Dev',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '1rem',
                                letterSpacing: '1px',
                                margin: '0',
                                color: '#828ba2',
                            },
                        },
                        {
                            id: 'industry',
                            name: 'Industry',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Information Technology',
                            styles: {
                                fontWeight: 'bolder',
                                fontSize: '1rem',
                                letterSpacing: '1px',
                                margin: '0',
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
                    enabled: true,
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
                    id: 'experienceBlock',
                    name: TemplateBlockTitles.Experience,
                    items: [
                        {
                            id: 'jobTitle',
                            name: 'Job Title',
                            placeholder: 'Job Title',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Software Engineer',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'companyName',
                            name: 'Company Name',
                            placeholder: 'Company Name',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Facebook',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'employmentType',
                            name: 'Employment Type',
                            placeholder: 'Employment Type',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Full-Time',
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
                            placeholder: 'City',
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
                            id: 'country',
                            name: 'Country',
                            placeholder: 'Country',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Italy',
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
                    enabled: true,
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
                    enabled: true,
                },
                {
                    id: 'educationBlock1',
                    name: TemplateBlockTitles.Education,
                    items: [
                        {
                            id: 'institution',
                            name: 'University',
                            placeholder: 'University',
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
                            placeholder: 'Degree',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Master Degree',
                            styles: { fontSize: '15px' },
                        },
                        {
                            id: 'description',
                            name: 'Description',
                            placeholder: 'Description',
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
                    enabled: true,
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
                        {
                            id: 'languageLevel',
                            name: 'Language Level',
                            placeholder: 'Language Level',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Elementary',
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
                    enabled: true,
                },
                {
                    id: 'contactsBlock',
                    name: TemplateBlockTitles.Contacts,
                    items: [
                        {
                            id: 'phoneNumber',
                            name: 'Phone Number',
                            placeholder: 'Phone Number',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '+380951643917',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'socialContact',
                            name: 'Social Contact',
                            placeholder: 'Social Contact',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'LinkedIn',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '1rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'link',
                            name: 'Link',
                            placeholder: 'Link',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'https://www.linkedin.com',
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
                    enabled: true,
                },
                {
                    id: 'certificationBlock',
                    name: TemplateBlockTitles.Certification,
                    items: [
                        {
                            id: 'certificationName',
                            name: 'Certification',
                            placeholder: 'Certification',
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
                            placeholder: 'Authority',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Amazon Web Services (AWS)',
                            styles: {
                                paddingBottom: '10px',
                                fontSize: '0.75rem',
                                color: '#828ba2',
                                margin: '0',
                            },
                        },
                        {
                            id: 'certificationUrlOrCode',
                            name: 'Certification Code',
                            placeholder: 'Certification Code',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '(AWS E3256)',
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
                    enabled: true,
                },
            ],
            styles: {
                display: 'flex',
                gap: '10px',
                borderTop: '2px solid #c7cacf',
                alignItems: 'baseline',
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
    },
};

export { prettifiedTemplate };
