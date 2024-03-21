import { type TemplateSettings } from '../types/types.js';

type Containers = TemplateSettings['containers'];

const updateTemplateSettingsAvatar = (
    containers: Containers,
    avatar: string,
): Containers =>
    containers.map((container) => ({
        ...container,
        blocks: container.blocks.map((block) => {
            return {
                ...block,
                items: block.items.map((item) => {
                    if (item.id === 'avatar') {
                        return {
                            ...item,
                            avatar,
                        };
                    }
                    return item;
                }),
            };
        }),
    }));

export { updateTemplateSettingsAvatar };
