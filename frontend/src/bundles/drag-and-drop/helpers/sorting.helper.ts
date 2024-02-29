import { type Active, type Over, type UniqueIdentifier } from '@dnd-kit/core';

import { type SortingContainterProperties } from '../types/sorting-container-properties.type';

const moveItem = (
    containers: SortingContainterProperties[],
    active: Active,
    over: Over,
): SortingContainterProperties[] => {
    const activeContainerIndex = containers.findIndex((container) =>
        container.items.some((item) => item.id === active.id),
    );
    const overContainerIndex = containers.findIndex(
        (container) =>
            container.id === over.id ||
            container.items.some((item) => item.id === over.id),
    );

    const activeItemIndex = containers[activeContainerIndex].items.findIndex(
        (item) => item.id === active.id,
    );
    const overItemIndex = containers[overContainerIndex].items.findIndex(
        (item) => item.id === over.id,
    );

    const activeItem = containers[activeContainerIndex].items.splice(
        activeItemIndex,
        1,
    )[0];

    containers[overContainerIndex].items.splice(overItemIndex, 0, activeItem);

    return [...containers];
};

const isItemOverContainer = (active: Active, over: Over): boolean => {
    return (
        (active.data.current?.type === 'item' &&
            over.data.current?.type === 'item') ||
        over.data.current?.type === 'container'
    );
};

const findItemWithId = (
    containers: SortingContainterProperties[],
    id: UniqueIdentifier,
): React.ReactNode | undefined => {
    return containers
        .flatMap((container) => container.items)
        .find((item) => item.id === id)?.item;
};

export { findItemWithId, isItemOverContainer, moveItem };
