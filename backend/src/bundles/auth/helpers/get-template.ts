import fs from 'node:fs';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import * as Pug from 'pug';

type Context = {
    title: 'ResumeGemm';
    dashboardLink: string;
    logoLink: string;
};

type Properties = {
    name: string;
    context: Context;
};

const getTemplate = ({ name, context }: Properties): string => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const emailTemplatePath = fs.readFileSync(
        path.join(__dirname, `../../../templates/${name}.pug`),
        'utf8',
    );
    const template = Pug.compile(emailTemplatePath);
    return template(context);
};

export { getTemplate };
