import { type TemplateSettings } from '../types/types';

type Containers = TemplateSettings['containers'];

const updateSettingsBlocksFromInputs = (
    tabs: Containers,
    fieldName: string,
    inputValue: string,
): Containers =>
    tabs.map((container) => ({
        ...container,
        blocks: container.blocks.map((block) => ({
            ...block,
            items: block.items.map((item) =>
                item.name === fieldName
                    ? { ...item, content: inputValue }
                    : item,
            ),
        })),
    }));

export { updateSettingsBlocksFromInputs };
