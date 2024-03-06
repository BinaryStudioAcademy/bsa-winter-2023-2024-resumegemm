import 'react-toastify/dist/ReactToastify.min.css';

import { type FC, type ReactNode, useContext } from 'react';
import { Bounce, ToastContainer } from 'react-toastify';

import { ToastContext } from '~/bundles/toast/context/toast-context';

type Properties = {
    children: ReactNode;
};

const ToastProvider: FC<Properties> = ({ children }) => {
    const { showToast } = useContext(ToastContext);

    return (
        <ToastContext.Provider value={{ showToast }}>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            {children}
        </ToastContext.Provider>
    );
};

export { ToastProvider };
