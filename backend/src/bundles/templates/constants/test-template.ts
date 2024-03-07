import { TemplateBlockTitles } from '../enums/enums.js';
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
                            type: 'h1',
                            content: 'John Doe',
                            styles: { color: '#3498db', fontSize: '24px' },
                        },
                        {
                            id: 'profileItem',
                            name: 'Profile',
                            type: 'p',
                            content: 'Web Developer',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'emailItem',
                            name: 'Email',
                            type: 'p',
                            content: 'john.doe@example.com',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f2f2f2', padding: '20px' },
                },
                {
                    id: 'contactBlock',
                    name: TemplateBlockTitles.Contacts,
                    items: [
                        {
                            id: 'phoneItem',
                            name: 'Phone',
                            type: 'p',
                            content: '+123 456 7890',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'addressItem',
                            name: 'Address',
                            type: 'p',
                            content: '123 Main Street, Cityville',
                            styles: { color: '#333' },
                        },
                        {
                            id: 'websiteItem',
                            name: 'Website',
                            type: 'p',
                            content: 'www.johndoe.com',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '20px' },
                },
            ],
            styles: { background: '#ffffff', margin: '20px' },
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
                            type: 'h1',
                            content: 'Software Engineer',
                            styles: { color: '#3498db', fontSize: '20px' },
                        },
                        {
                            id: 'expItem2',
                            name: 'Company 1',
                            type: 'p',
                            content: 'Tech Solutions Inc.',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'expItem3',
                            name: 'Duration 1',
                            type: 'p',
                            content: 'Jan 2020 - Present',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f9e6e6', padding: '20px' },
                },
                // Add more blocks for additional work experience
            ],
            styles: { background: '#ffffff', margin: '20px' },
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
                            type: 'h1',
                            content: 'Bachelor of Science in Computer Science',
                            styles: { color: '#3498db', fontSize: '20px' },
                        },
                        {
                            id: 'eduItem2',
                            name: 'Institution 1',
                            type: 'p',
                            content: 'University of Technology',
                            styles: { color: '#333', fontStyle: 'italic' },
                        },
                        {
                            id: 'eduItem3',
                            name: 'Graduation Year 1',
                            type: 'p',
                            content: 'May 2019',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#e6f7ff', padding: '20px' },
                },
                {
                    id: 'skillsBlock',
                    name: TemplateBlockTitles.Skills,
                    items: [
                        {
                            id: 'skillsItem',
                            name: 'Skills',
                            type: 'p',
                            content: 'JavaScript, React, Node.js, Python, SQL',
                            styles: { color: '#333' },
                        },
                    ],
                    styles: { backgroundColor: '#f2f2f2', padding: '20px' },
                },
            ],
            styles: { background: '#ffffff', margin: '20px' },
        },
    ],
    styles: { fontFamily: 'Arial, sans-serif', color: '#333', padding: '10px' },
};

export { testTemplate };
