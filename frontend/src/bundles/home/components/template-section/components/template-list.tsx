import React from 'react';
import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';
import { ResumeCard } from '~/bundles/home/components/components';

import styles from './styles.module.scss';

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
            {templates.length > 0 ? (
                templates.map((template) => (
                    <Link
                        to={`${AppRoute.TEMPLATE}/${template.id}`}
                        key={template.id}
                    >
                        <ResumeCard title="My Resume" image={template.image} />
                    </Link>
                ))
            ) : (
                <p className={styles.template_not_found_message}>
                    No results found for your search
                </p>
            )}
        </>
    );
};

export { TemplateList };
