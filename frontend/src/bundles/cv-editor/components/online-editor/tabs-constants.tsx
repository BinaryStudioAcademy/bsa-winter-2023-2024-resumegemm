import React from 'react';

import { CertificationForm } from '../../pages/certification/certification';
import { ContactInfoForm } from '../../pages/contact-info/contact-info';
import { CustomSection } from '../../pages/custom-section/custom-section';
import { EducationForm } from '../../pages/education/education';
import { ExperienceForm } from '../../pages/experience/experience';
import { LanguagesForm } from '../../pages/languages/languages';
import { PersonalInfoForm } from '../../pages/personal-info/personal-info';
import { TechnicalSkillsForm } from '../../pages/technical-skills/technical-skills';

const OnlineEditorTabs = [
    {
        id: 0,
        label: 'Personal Information',
        content: <PersonalInfoForm />,
    },
    {
        id: 1,
        label: 'Experience',
        content: <ExperienceForm />,
    },
    {
        id: 2,
        label: 'Technical Skills',
        content: <TechnicalSkillsForm />,
    },
    {
        id: 3,
        label: 'Education',
        content: <EducationForm />,
    },
    {
        id: 4,
        label: 'Contact Information',
        content: <ContactInfoForm />,
    },
    {
        id: 5,
        label: 'Certification',
        content: <CertificationForm />,
    },
    {
        id: 6,
        label: 'Languages',
        content: <LanguagesForm />,
    },
    {
        id: 7,
        label: 'Custom Section',
        content: <CustomSection />,
    },
];

export { OnlineEditorTabs };
