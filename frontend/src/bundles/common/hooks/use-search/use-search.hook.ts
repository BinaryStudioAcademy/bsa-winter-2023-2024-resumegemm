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

            if (value.trim() === '') {
                return setSearchParameters((parameters) => {
                    parameters.delete(searchParameter);
                    return parameters;
                });
            }
            setSearchParameters({ [searchParameter]: value });
        },
        [setSearchParameters, searchParameter],
    );
};

export { useSearch };
