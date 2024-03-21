import { TemplateItemTags } from 'shared/build';

import { type TemplateSettings } from '../types/types';

const hasHeader = (
    blockName: string,
    templateSettings: TemplateSettings,
): boolean => {
    return templateSettings.containers.some((container) =>
        container.blocks.some(
            (block) =>
                block.name === blockName &&
                block.items.some(
                    (item) => item.tagName === TemplateItemTags.HEADING,
                ),
        ),
    );
};

export { hasHeader };
