import { type ReactElement, type ReactNode } from 'react';

type DataWrapperProperties = {
    isLoading: boolean,
    hasData: boolean,
    children: ReactNode,
    customSpinnerElement?: ReactElement,
    customMessageElement?: ReactElement
};

export { type DataWrapperProperties };
