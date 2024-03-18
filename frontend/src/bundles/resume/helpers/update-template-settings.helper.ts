import { type TemplateSettings } from '../types/types.js';

type Containers = TemplateSettings['containers'];

const updateTemplateSettings = (
    containers: Containers,
    payload: Containers,
): Containers =>
    containers.map((container, index) => ({
        ...container,
        blocks: payload[index].blocks,
    }));

export { updateTemplateSettings };
