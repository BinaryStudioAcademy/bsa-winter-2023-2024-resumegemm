import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';

type Properties = {
    id: UniqueIdentifier;
    children: React.ReactNode;
    className?: string;
};

const DropContainer: React.FC<Properties> = ({ id, children, className }) => {
    const { setNodeRef } = useDroppable({
        id: id,
        data: {
            type: 'container',
        },
    });

    return (
        <div ref={setNodeRef} className={className}>
            {children}
        </div>
    );
};

export { DropContainer };
