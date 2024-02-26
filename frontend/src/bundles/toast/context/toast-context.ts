import { createContext } from 'react';

import { showToast } from '~/bundles/toast/helpers/show-toast';
import { type ToastContext } from '~/bundles/toast/types/toast-context.type';

const ToastContext = createContext<ToastContext>({ showToast });

export { ToastContext };
