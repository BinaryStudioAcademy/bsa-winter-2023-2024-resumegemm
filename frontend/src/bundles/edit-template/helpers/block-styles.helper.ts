import { FontStyles } from '../enums/font-styles';
import { type FontStyleChange } from '../types/font-styles-change.type';
import { type StyleChange } from '../types/styles-change.type';
import { type TemplateSettings } from '../types/types';

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

const changeFontStyle = ({
    blockName,
    templateSettings,
    fontFamily,
    fontSize,
    fontStyle,
    tagName,
}: FontStyleChange): TemplateSettings => {
    const weight = [FontStyles.Bold, FontStyles.BoldItalic].includes(fontStyle)
        ? FontStyles.Bold
        : '';
    const style = [FontStyles.Italic, FontStyles.BoldItalic].includes(fontStyle)
        ? FontStyles.Italic
        : '';
    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            const newBlocks = container.blocks.map((block) => {
                if (block.name === blockName) {
                    const newChildren = block.items.map((child) => {
                        if (child.tagName === tagName) {
                            return {
                                ...child,
                                styles: {
                                    ...child.styles,
                                    fontFamily: fontFamily,
                                    fontSize: fontSize,
                                    fontWeight: weight,
                                    fontStyle: style,
                                },
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

export { changeBlockItemsStyle, changeBlockStyle, changeFontStyle };
