import { type KeyboardEvent, type SyntheticEvent } from 'react';

type ModalHandlers = {
    handleOutsideClick: () => void;
    preventModalCloseOnClick: (event: SyntheticEvent) => void;
    handleModalCloseOnEscapeKey: (event: KeyboardEvent) => void;
};

export { type ModalHandlers };
