import { useDroppable } from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { type LayoutContainer } from '~/bundles/templates-page/types/types';

import { TemplateBlock } from '../template-block/template-block';
import containerStyles from './styles.module.scss';

type Properties = LayoutContainer;
const TemplateContainer: React.FC<Properties> = ({ id, blocks, styles }) => {
    const { setNodeRef } = useDroppable({
        id: id,
        data: {
            type: 'container',
        },
    });

    return (
        <div
            style={{
                ...styles,
            }}
            ref={setNodeRef}
            className={containerStyles.container}
        >
            <SortableContext
                items={blocks.map((block) => block.id)}
                strategy={rectSortingStrategy}
            >
                {blocks.map(
                    (block) =>
                        block.enabled && (
                            <TemplateBlock key={block.id} {...block} />
                        ),
                )}
            </SortableContext>
        </div>
    );
};

export { TemplateContainer };
