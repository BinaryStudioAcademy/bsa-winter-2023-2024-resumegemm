import { type CSSProperties } from 'react';

import { type LayoutContainer } from './layout-container.type';

type TemplateSettings = {
    containers: LayoutContainer[];
    styles: Partial<CSSProperties>;
};

export { type TemplateSettings };
