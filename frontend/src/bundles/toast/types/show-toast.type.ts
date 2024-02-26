import { type ToastOptions } from 'react-toastify';

import { type ToastType } from '~/bundles/toast/enums/show-toast-types.enum';

type ShowToast = (
    message: string,
    type: ToastType,
    options?: ToastOptions,
) => void;

export { type ShowToast };
