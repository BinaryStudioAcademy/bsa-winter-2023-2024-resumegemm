import { toast } from 'react-toastify';

import { type ShowToast } from '~/bundles/toast/types/show-toast.type';

const showToast: ShowToast = (message, type, options?): void => {
    switch (type) {
        case 'success': {
            toast.success(message, options);
            break;
        }
        case 'error': {
            toast.error(message, options);
            break;
        }
        case 'warning': {
            toast.warning(message, options);
            break;
        }
        case 'info': {
            toast.info(message, options);
            break;
        }
    }
};

export { showToast };
