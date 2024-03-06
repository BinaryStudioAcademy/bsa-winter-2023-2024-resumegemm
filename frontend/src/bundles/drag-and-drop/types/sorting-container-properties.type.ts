import { type UniqueIdentifier } from '@dnd-kit/core';

import { type SortableNode } from './sortable-node.type';

type SortingContainterProperties = {
    id: UniqueIdentifier;
    items: SortableNode[];
};

export { type SortingContainterProperties };
