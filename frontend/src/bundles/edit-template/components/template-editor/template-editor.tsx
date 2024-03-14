import {
    type Active,
    type DragOverEvent,
    type DragStartEvent,
} from '@dnd-kit/core';
import { closestCorners, DndContext, DragOverlay } from '@dnd-kit/core';

import {
    useCallback,
    useState,
    useTemplateSensors,
} from '~/bundles/common/hooks/hooks';

import { TemplateContext } from '../../context/template-context';
import { findBlockById, moveBlock } from '../../helpers/sorting.helper';
import { type TemplateSettings } from '../../types/types';
import { RegularBlock } from '../template-block/regular-block';
import { TemplateContainer } from '../template-container/template-container';
import styles from './styles.module.scss';

type Properties = {
    templateSettings: TemplateSettings;
    setTemplateSettings: React.Dispatch<React.SetStateAction<TemplateSettings>>;
};

const TemplateEditor: React.FC<Properties> = ({
    templateSettings,
    setTemplateSettings,
}) => {
    const [active, setActive] = useState<Active | null>(null);

    const sensors = useTemplateSensors();

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActive(event.active);
    }, []);

    const handleDragOver = useCallback(
        (event: DragOverEvent) => {
            const { active, over } = event;
            if (!over) {
                return;
            }

            setTemplateSettings((templateSettings) => {
                if (active.data.current?.type === 'block') {
                    return moveBlock(templateSettings, active, over);
                }
                return templateSettings;
            });
        },
        [setTemplateSettings],
    );

    const handleDragEnd = useCallback(() => {
        setActive(null);
    }, []);

    const handleDragOverlay = useCallback(
        (active: Active) => {
            const block = findBlockById(templateSettings, active.id);
            if (block) {
                return <RegularBlock {...block} />;
            }
        },
        [templateSettings],
    );

    return (
        <TemplateContext.Provider
            value={{ templateSettings, setTemplateSettings }}
        >
            <DndContext
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                collisionDetection={closestCorners}
                sensors={sensors}
            >
                <div
                    style={templateSettings.styles}
                    className={styles.template_editor}
                >
                    {templateSettings.containers.map((container) => (
                        <TemplateContainer key={container.id} {...container} />
                    ))}
                    <DragOverlay>
                        {active && handleDragOverlay(active)}
                    </DragOverlay>
                </div>
            </DndContext>
        </TemplateContext.Provider>
    );
};

export { TemplateEditor };
