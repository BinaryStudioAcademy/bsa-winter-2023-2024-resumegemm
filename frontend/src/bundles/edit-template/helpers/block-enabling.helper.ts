import { type TemplateSettings } from '../types/types';

const changeBlockEnabling = (
    name: string,
    checked: boolean,
    templateSettings: TemplateSettings,
): TemplateSettings => {
    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            const newBlocks = container.blocks.map((block) => {
                if (block.name === name) {
                    return { ...block, enabled: checked };
                }
                return block;
            });

            return { ...container, blocks: newBlocks };
        }),
    };
};

const isBlockEnabled = (
    blockName: string,
    templateSettings: TemplateSettings,
): boolean => {
    return templateSettings.containers.some((container) =>
        container.blocks.some(
            (block) => block.name === blockName && block.enabled,
        ),
    );
};

export { changeBlockEnabling, isBlockEnabled };
