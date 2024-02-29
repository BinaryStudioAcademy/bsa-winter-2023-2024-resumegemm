import { type UniqueIdentifier } from '@dnd-kit/core';

type SortingContainterProperties = {
    id: UniqueIdentifier;
    items: {
        id: UniqueIdentifier;
        item: React.ReactNode;
    }[];
};

export { type SortingContainterProperties };
