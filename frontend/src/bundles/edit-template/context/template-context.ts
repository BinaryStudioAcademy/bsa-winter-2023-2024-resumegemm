import { createContext } from 'react';

import { type TemplateSettings } from '../types/types';

const TemplateContext = createContext<{
    templateSettings: TemplateSettings;
    setTemplateSettings: React.Dispatch<React.SetStateAction<TemplateSettings>>;
}>({
    templateSettings: {
        containers: [],
        styles: {},
    },
    setTemplateSettings: () => {
        return;
    },
});

export { TemplateContext };
