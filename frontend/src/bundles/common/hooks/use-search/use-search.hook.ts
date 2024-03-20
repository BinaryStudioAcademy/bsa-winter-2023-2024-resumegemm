import { useSearchParams } from 'react-router-dom';
import { type SearchParameters } from 'shared/build/index.js';
import { type ValueOf } from 'shared/src/types/value-of.type';

import { useCallback } from '~/bundles/common/hooks/hooks';

type Properties = ValueOf<typeof SearchParameters>;

type ReturnType = (event: React.ChangeEvent<HTMLInputElement>) => void;

const useSearch = (searchParameter: Properties): ReturnType => {
    const [, setSearchParameters] = useSearchParams();

    return useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const { value } = event.target;

            setSearchParameters((parameters) => {
                value.trim() === ''
                    ? parameters.delete(searchParameter)
                    : parameters.set(searchParameter, value);

                return parameters;
            });
        },
        [setSearchParameters, searchParameter],
    );
};

export { useSearch };
