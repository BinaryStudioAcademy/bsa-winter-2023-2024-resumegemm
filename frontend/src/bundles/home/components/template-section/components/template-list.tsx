import React from 'react';

import { ResumeCard } from '~/bundles/home/components/components';

type Template = {
    id: string;
    image: string;
    title?: string;
    subtitle?: string;
};

type ResumeCardsProperties = {
    templates: Template[];
};

const TemplateList: React.FC<ResumeCardsProperties> = ({ templates }) => {
    if (templates.length === 0) {
        return null;
    }

    return (
        <>
            {templates.map((template) => (
                <ResumeCard
                    key={template.id}
                    title="My Resume"
                    image={template.image}
                />
            ))}
        </>
    );
};

export { TemplateList };
