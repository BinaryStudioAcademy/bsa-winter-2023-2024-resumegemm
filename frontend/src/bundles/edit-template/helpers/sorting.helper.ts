import { type Active, type Over, type UniqueIdentifier } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import {
    type LayoutBlock,
    type LayoutContainer,
    type LayoutItem,
    type TemplateSettings,
} from '../types/types';

const findBlockById = (
    templateSettings: TemplateSettings,
    blockId: UniqueIdentifier,
): LayoutBlock | undefined => {
    return templateSettings.containers
        .flatMap((container) => container.blocks)
        .find((block) => block.id === blockId);
};

const findItemById = (
    templateSettings: TemplateSettings,
    itemId: UniqueIdentifier,
): LayoutItem | undefined => {
    return templateSettings.containers
        .flatMap((container) => container.blocks)
        .flatMap((block) => block.items)
        .find((item) => item.id === itemId);
};

const findBlockByItemId = (
    templateSettings: TemplateSettings,
    itemId: UniqueIdentifier,
): LayoutBlock | undefined => {
    return templateSettings.containers
        .flatMap((container) => container.blocks)
        .find((block) => block.items.some((item) => item.id === itemId));
};

const findContainerByItemId = (
    templateSettings: TemplateSettings,
    itemId: UniqueIdentifier,
): LayoutContainer | undefined => {
    return templateSettings.containers.find((container) =>
        container.blocks.some((block) =>
            block.items.some((item) => item.id === itemId),
        ),
    );
};

const findContainerByBlockId = (
    templateSettings: TemplateSettings,
    blockId: UniqueIdentifier,
): LayoutContainer | undefined => {
    return templateSettings.containers.find((container) =>
        container.blocks.some((block) => block.id === blockId),
    );
};

const sortItems = (
    templateSettings: TemplateSettings,
    activeItem: Active,
    overItem: Over | null,
): TemplateSettings => {
    const isActiveItem = activeItem.data.current?.type === 'item';
    const isOverItem = overItem?.data.current?.type === 'item';

    if (!isActiveItem || !overItem || !isOverItem) {
        return templateSettings;
    }

    const activeBlock = findBlockByItemId(templateSettings, activeItem.id);
    const overBlock = findBlockByItemId(templateSettings, overItem.id);

    if (!activeBlock || !overBlock || activeBlock.id !== overBlock.id) {
        return templateSettings;
    }

    const activeItemIndex = activeBlock.items.findIndex(
        (item) => item.id === activeItem.id,
    );
    const overItemIndex = activeBlock.items.findIndex(
        (item) => item.id === overItem.id,
    );

    const newItems = [...activeBlock.items];
    const movedItems = arrayMove(newItems, activeItemIndex, overItemIndex);

    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => ({
            ...container,
            blocks: container.blocks.map((block) =>
                block.id === activeBlock.id
                    ? { ...block, items: movedItems }
                    : block,
            ),
        })),
    };
};

const sortBlocks = (
    templateSettings: TemplateSettings,
    activeBlock: Active,
    overBlockId: UniqueIdentifier,
): TemplateSettings => {
    const activeContainer = findContainerByBlockId(
        templateSettings,
        activeBlock.id,
    );
    const overContainer = findContainerByBlockId(templateSettings, overBlockId);

    if (!activeContainer || !overContainer) {
        return templateSettings;
    }

    const activeBlockIndex = activeContainer.blocks.findIndex(
        (block) => block.id === activeBlock.id,
    );
    const overBlockIndex = overContainer.blocks.findIndex(
        (block) => block.id === overBlockId,
    );

    if (activeContainer.id === overContainer.id) {
        const newBlocks = arrayMove(
            activeContainer.blocks,
            activeBlockIndex,
            overBlockIndex,
        );

        return {
            ...templateSettings,
            containers: templateSettings.containers.map((container) =>
                container.id === activeContainer.id
                    ? { ...container, blocks: newBlocks }
                    : container,
            ),
        };
    }

    const newActiveBlocks = [...activeContainer.blocks];
    const newOverBlocks = [...overContainer.blocks];

    const movedBlock = newActiveBlocks[activeBlockIndex];
    newActiveBlocks.splice(activeBlockIndex, 1);
    newOverBlocks.splice(overBlockIndex, 0, movedBlock);

    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            if (container.id === activeContainer.id) {
                return { ...container, blocks: newActiveBlocks };
            }
            if (container.id === overContainer.id) {
                return { ...container, blocks: newOverBlocks };
            }
            return container;
        }),
    };
};

const addBlockToContainer = (
    templateSettings: TemplateSettings,
    activeBlock: Active,
    containerId: UniqueIdentifier,
): TemplateSettings => {
    const activeContainer = findContainerByBlockId(
        templateSettings,
        activeBlock.id,
    );
    const overContainer = templateSettings.containers.find(
        (container) => container.id === containerId,
    );

    const isSameContainer = activeContainer?.id === overContainer?.id;

    if (!activeContainer || !overContainer || isSameContainer) {
        return templateSettings;
    }

    const newActiveBlocks = [...activeContainer.blocks];
    const newOverBlocks = [...overContainer.blocks];

    const movedBlock = newActiveBlocks.find(
        (block) => block.id === activeBlock.id,
    );
    if (!movedBlock) {
        return templateSettings;
    }
    newActiveBlocks.splice(newActiveBlocks.indexOf(movedBlock), 1);
    newOverBlocks.push(movedBlock);

    return {
        ...templateSettings,
        containers: templateSettings.containers.map((container) => {
            if (container.id === activeContainer.id) {
                return { ...container, blocks: newActiveBlocks };
            }
            if (container.id === overContainer.id) {
                return { ...container, blocks: newOverBlocks };
            }
            return container;
        }),
    };
};

const moveBlock = (
    templateSettings: TemplateSettings,
    activeBlock: Active,
    overObject: Over | null,
): TemplateSettings => {
    const isActiveBlock = activeBlock.data.current?.type === 'block';
    const isOverBlock = overObject?.data.current?.type === 'block';
    const isOverContainer = overObject?.data.current?.type === 'container';

    if (!isActiveBlock || !overObject) {
        return templateSettings;
    }

    if (isOverContainer) {
        return addBlockToContainer(
            templateSettings,
            activeBlock,
            overObject.id,
        );
    }

    if (isOverBlock) {
        return sortBlocks(templateSettings, activeBlock, overObject.id);
    }

    return templateSettings;
};

export {
    findBlockById,
    findBlockByItemId,
    findContainerByItemId,
    findItemById,
    moveBlock,
    sortItems,
};
