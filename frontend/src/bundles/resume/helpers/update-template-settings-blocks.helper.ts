import { type LayoutItem, type TemplateSettings } from '../types/types';

type Containers = TemplateSettings['containers'];

const updateItemsWithResumeFields = (
    items: LayoutItem[],
    resumePayload: object,
): LayoutItem[] =>
    items.map((item) => {
        const updatedContentWithResumeValue =
            resumePayload[item.id as keyof typeof resumePayload];
        if (updatedContentWithResumeValue) {
            return { ...item, content: updatedContentWithResumeValue };
        }
        return item;
    });

const updateTemplateSettingsBlocks = (
    containers: Containers,
    resumePayload: object,
): Containers =>
    containers.map((container) => ({
        ...container,
        blocks: container.blocks.map((block) => ({
            ...block,
            enabled: true,
            items: updateItemsWithResumeFields(block.items, resumePayload),
        })),
    }));

export { updateTemplateSettingsBlocks };
