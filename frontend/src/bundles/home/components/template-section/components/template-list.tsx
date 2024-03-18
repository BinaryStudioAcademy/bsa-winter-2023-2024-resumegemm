import React from 'react';
import { Link } from 'react-router-dom';
import { type TemplateDto } from 'shared/build/bundles/templates/types/template-dto.type';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { ResumeCard } from '~/bundles/home/components/components';

type ResumeCardsProperties = {
    templates: TemplateDto[];
};

const TemplateList: React.FC<ResumeCardsProperties> = ({ templates }) => {
    if (templates.length === 0) {
        return null;
    }

    return (
        <>
            {templates.length > 0 &&
                templates.map((template) => (
                    <Link
                        to={`${AppRoute.TEMPLATE}/${template.id}`}
                        key={template.id}
                    >
                        <ResumeCard
                            title={template.name}
                            image={template.image}
                        />
                    </Link>
                ))}
        </>
    );
};

export { TemplateList };
