import { createContext } from 'react';

import { type TemplateSettings } from '../types/types';

const TemplateContext = createContext<{
    templateSettings: TemplateSettings;
    setTemplateSettings: React.Dispatch<React.SetStateAction<TemplateSettings>>;
}>(
    {} as {
        templateSettings: TemplateSettings;
        setTemplateSettings: React.Dispatch<
            React.SetStateAction<TemplateSettings>
        >;
    },
);

export { TemplateContext };
