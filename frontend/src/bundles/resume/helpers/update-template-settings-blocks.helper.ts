import {
    type LayoutItem,
    type ResumeWithRelationsAndTemplateResponseDto,
    type TemplateSettings,
} from '../types/types';

type Containers = TemplateSettings['containers'];
type PersonalInfo =
    ResumeWithRelationsAndTemplateResponseDto['personalInformation'];

const updateItemsWithResumeFields = (
    items: LayoutItem[],
    personalInfo: PersonalInfo,
): LayoutItem[] =>
    items.map((item) =>
        item.name === 'firstName'
            ? { ...item, content: personalInfo?.firstName as string }
            : item,
    );

const updateTemplateSettingsBlocks = (
    containers: Containers,
    personalInfo: PersonalInfo,
): Containers =>
    containers.map((container) => ({
        ...container,
        blocks: container.blocks.map((block) => ({
            ...block,
            enabled: true,
            items: updateItemsWithResumeFields(block.items, personalInfo),
        })),
    }));

export { updateTemplateSettingsBlocks };
