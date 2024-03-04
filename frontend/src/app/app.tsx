import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { RouterOutlet } from '~/bundles/common/components/components.js';
import { updatePageTab } from '~/bundles/common/helpers/update-page-tab';

const App: React.FC = () => {
    const location = useLocation();

    useEffect(() => {
        updatePageTab();
    }, [location]);

    return <RouterOutlet />;
};

export { App };
