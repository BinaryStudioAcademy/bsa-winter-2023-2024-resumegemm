import { type ReactElement, type ReactNode } from 'react';

type DataWrapperProperties = {
    isLoading?: boolean;
    hasData?: boolean;
    children: ReactNode;
    CustomSpinnerComponent?: ReactElement;
    CustomMessageComponent?: ReactElement;
};

export { type DataWrapperProperties };
