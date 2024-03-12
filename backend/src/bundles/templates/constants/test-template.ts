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
                            id: 'nameItem',
                            name: 'Name',
                            tagName: TemplateItemTags.HEADING,
                            content: 'John Doe',
                            styles: { color: '#3498db' },
                        },
                        {
                            id: 'profileItem',
                            name: 'Profile',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Web Developer',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'emailItem',
                            name: 'Email',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'john.doe@example.com',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f2f2f2', padding: '5px' },
                },
                {
                    id: 'contactBlock',
                    name: TemplateBlockTitles.Contacts,
                    items: [
                        {
                            id: 'phoneItem',
                            name: 'Phone',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '+123 456 7890',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'addressItem',
                            name: 'Address',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: '123 Main Street, Cityville',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'websiteItem',
                            name: 'Website',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'www.johndoe.com',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '5px' },
                },
                {
                    id: 'socialBlock',
                    name: TemplateBlockTitles.Socials,
                    items: [
                        {
                            id: 'linkedinItem',
                            name: 'LinkedIn',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'linkedin.com/in/johndoe',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'githubItem',
                            name: 'GitHub',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'github.com/johndoe',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f9e6e6', padding: '5px' },
                },
                {
                    id: 'summaryBlock',
                    name: TemplateBlockTitles.Summary,
                    items: [
                        {
                            id: 'summaryItem',
                            name: 'Summary',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content:
                                'A passionate web developer with 5 years of experience',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '5px' },
                },
            ],
            styles: {
                background: '#ffffff',
                gridColumn: '1 / 3',
            },
        },
        {
            id: 'experienceContainer',
            name: 'Work Experience',
            blocks: [
                {
                    id: 'expBlock1',
                    name: TemplateBlockTitles.Experience,
                    items: [
                        {
                            id: 'expItem1',
                            name: 'Job Title 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Software Engineer',
                            styles: { color: '#3498db' },
                        },
                        {
                            id: 'expItem2',
                            name: 'Company 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Tech Solutions Inc.',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'expItem3',
                            name: 'Duration 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Jan 2020 - Present',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f9e6e6' },
                },
            ],
            styles: { background: '#ffffff' },
        },
        {
            id: 'educationContainer',
            name: 'Education',
            blocks: [
                {
                    id: 'eduBlock1',
                    name: TemplateBlockTitles.Education,
                    items: [
                        {
                            id: 'eduItem1',
                            name: 'Degree 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Bachelor of Science in Computer Science',
                            styles: { color: '#3498db' },
                        },
                        {
                            id: 'eduItem2',
                            name: 'Institution 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'University of Technology',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'eduItem3',
                            name: 'Graduation Year 1',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'May 2019',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '5px' },
                },
                {
                    id: 'skillsBlock',
                    name: TemplateBlockTitles.Skills,
                    items: [
                        {
                            id: 'skillsItem',
                            name: 'Skills',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'Very skilled at web development',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f2f2f2', padding: '5px' },
                },
                {
                    id: 'techStackBlock',
                    name: TemplateBlockTitles.TechStack,
                    items: [
                        {
                            id: 'techStackItem',
                            name: 'Tech Stack',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'JavaScript, React, Node.js, MongoDB',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f9e6e6', padding: '5px' },
                },
                {
                    id: 'languagesBlock',
                    name: TemplateBlockTitles.Languages,
                    items: [
                        {
                            id: 'languagesItem',
                            name: 'Languages',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'English, Spanish',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '5px' },
                },
                {
                    id: 'portfolioBlock',
                    name: TemplateBlockTitles.Portfolio,
                    items: [
                        {
                            id: 'portfolioItem',
                            name: 'Portfolio',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'www.johndoe.com/portfolio',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f2f2f2', padding: '5px' },
                },
                {
                    id: 'recommendationsBlock',
                    name: TemplateBlockTitles.Recommendations,
                    items: [
                        {
                            id: 'recommendationsItem',
                            name: 'Recommendations',
                            tagName: TemplateItemTags.PARAGRAPH,
                            content: 'www.johndoe.com/recommendations',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f9e6e6', padding: '5px' },
                },
            ],
            styles: { background: '#ffffff' },
        },
    ],
    styles: {
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        padding: '5px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto 1fr',
    },
};

export { testTemplate };
