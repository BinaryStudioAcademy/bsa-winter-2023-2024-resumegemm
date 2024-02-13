import { type ReactNode } from 'react';

type ModalProperties = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export { type ModalProperties };
