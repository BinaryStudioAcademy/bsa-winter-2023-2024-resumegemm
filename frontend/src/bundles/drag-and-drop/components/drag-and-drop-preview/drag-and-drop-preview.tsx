import {
    type DragOverEvent,
    type DragStartEvent,
    type UniqueIdentifier,
} from '@dnd-kit/core';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';
import { verticalListSortingStrategy } from '@dnd-kit/sortable';
import React, { useCallback, useState } from 'react';

import {
    findItemWithId,
    isItemOverContainer,
    moveItem,
} from '../../helpers/sorting.helper';
import { type SortingContainterProperties } from '../../types/types';
import { SortableContainer } from '../sortable-container/sortable-container';
import { ExampleBlock } from './example-block';
import styles from './styles.module.scss';

const DragAndDropPreview: React.FC = () => {
    const [containers, setContainers] = useState<SortingContainterProperties[]>(
        [
            {
                id: 'personal-information',
                items: [
                    {
                        id: 'name',
                        item: <ExampleBlock>Name</ExampleBlock>,
                    },
                    {
                        id: 'email',
                        item: <ExampleBlock>Email</ExampleBlock>,
                    },
                    {
                        id: 'phone',
                        item: <ExampleBlock>Phone</ExampleBlock>,
                    },
                ],
            },

            {
                id: 'experience',
                items: [
                    {
                        id: 'company',
                        item: <ExampleBlock>Company</ExampleBlock>,
                    },
                    {
                        id: 'position',
                        item: <ExampleBlock>Position</ExampleBlock>,
                    },
                    {
                        id: 'description',
                        item: (
                            <ExampleBlock>
                                I was responsible for doing this and that and
                                also this
                            </ExampleBlock>
                        ),
                    },
                ],
            },

            {
                id: 'education',
                items: [
                    {
                        id: 'institution',
                        item: <ExampleBlock>Institution</ExampleBlock>,
                    },
                    {
                        id: 'degree',
                        item: <ExampleBlock>Degree</ExampleBlock>,
                    },
                    {
                        id: 'field-of-study',
                        item: <ExampleBlock>Field of study</ExampleBlock>,
                    },
                ],
            },
        ],
    );

    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id);
    }, []);

    const handleDragEnd = useCallback(() => {
        setActiveId(null);
    }, []);

    const handleDragOver = useCallback((event: DragOverEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) {
            return;
        }

        if (isItemOverContainer(active, over)) {
            setContainers((previousContainers) => {
                return moveItem(previousContainers, active, over);
            });
        }
    }, []);

    return (
        <div>
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                collisionDetection={closestCorners}
            >
                <div className={styles.container}>
                    {containers.map((container) => (
                        <SortableContainer
                            id={container.id}
                            key={container.id}
                            strategy={verticalListSortingStrategy}
                            items={container.items}
                            className={styles.container__block}
                        />
                    ))}
                </div>

                <DragOverlay>
                    {activeId && (
                        <div>{findItemWithId(containers, activeId)}</div>
                    )}
                </DragOverlay>
            </DndContext>
        </div>
    );
};

export { DragAndDropPreview };
