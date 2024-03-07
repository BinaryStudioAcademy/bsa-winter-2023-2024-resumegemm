import { type CSSProperties } from 'react';

import { type Container } from './container.type';

type TemplateSettings = {
    containers: Container[];
    styles: Partial<CSSProperties>;
};

export { type TemplateSettings };
