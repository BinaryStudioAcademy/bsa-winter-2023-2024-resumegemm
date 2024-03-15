import {
    type PointerSensorOptions,
    type SensorDescriptor,
    MouseSensor,
    TouchSensor,
    useSensor,
} from '@dnd-kit/core';

type ReturnValue = [
    mouseSensor: SensorDescriptor<PointerSensorOptions>,
    touchSensor: SensorDescriptor<PointerSensorOptions>,
];

const useTemplateSensors = (): ReturnValue => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 5,
        },
    });

    const touchSensor = useSensor(TouchSensor);

    return [mouseSensor, touchSensor];
};

export { useTemplateSensors };
