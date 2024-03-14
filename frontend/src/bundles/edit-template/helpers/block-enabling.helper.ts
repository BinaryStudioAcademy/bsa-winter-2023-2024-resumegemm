import { type StyleChange } from '../types/style-change.type';
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

const changeBlockStyle = ({
    blockName,
    value,
    style,
    templateSettings,
}: StyleChange): TemplateSettings => {
    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            const newBlocks = container.blocks.map((block) => {
                if (block.name === blockName) {
                    return {
                        ...block,
                        styles: { ...block.styles, [style]: value },
                    };
                }
                return block;
            });

            return { ...container, blocks: newBlocks };
        }),
    };
};

const changeBlockItemsStyle = ({
    blockName,
    tagName,
    value,
    style,
    templateSettings,
}: StyleChange): TemplateSettings => {
    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            const newBlocks = container.blocks.map((block) => {
                if (block.name === blockName) {
                    const newChildren = block.items.map((child) => {
                        if (child.tagName === tagName) {
                            return {
                                ...child,
                                styles: { ...child.styles, [style]: value },
                            };
                        }

                        return child;
                    });

                    return { ...block, items: newChildren };
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

export {
    changeBlockEnabling,
    changeBlockItemsStyle,
    changeBlockStyle,
    isBlockEnabled,
};
