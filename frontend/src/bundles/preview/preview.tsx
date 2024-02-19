import 'react-toastify/dist/ReactToastify.min.css';

import { Bounce, toast, ToastContainer } from 'react-toastify';

import { BaseButton, Checkbox, RadioButton, Switch, Tooltip } from '../common/components/components';
import { TooltipDimensions } from '../common/enums/enums';
import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import styles from './styles.module.scss';

const handleSuccessButton = (): void => {
    toast.success('Success! You did it!');
};
const handleErrorButton = (): void => {
    toast.error('Unexpected error has occurred.', {
        theme: 'dark',
        hideProgressBar: true,
    });
};

const PreviewPage: React.FC = () => {
    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
            <div className={styles.preview}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <div className={styles.example}>Component preview</div>
                    </li>
                    <li className={styles.item}>
                        <Checkbox label="Checkbox" />
                        <RadioButton label="Radio button" />
                        <Switch label="Switch" />
                    </li>
                    <li className={styles.item}>
                        <BaseButton onClick={handleSuccessButton}>Toaster success</BaseButton>
                        <BaseButton onClick={handleErrorButton}>Toaster error</BaseButton>
                    </li>
                    <li className={styles.item}>
                        <div className={styles.tooltip_small_example_container}>
                            <Tooltip dimensionType={TooltipDimensions.expand100Percent} text='tooltip text' />
                        </div>
                        <div className={styles.tooltip_big_example_container}>
                            <Tooltip dimensionType={TooltipDimensions.expand100Percent} text='tooltip text' />
                        </div>
                        <Tooltip text='tooltip text'>
                            <p>
                                Tooltip
                            </p>
                        </Tooltip>
                        <Home />
                    </li>
                    <li className={styles.item}>
                        <Templates />
                    </li>
                </ul>
            </div>
        </>
    );
};

export { PreviewPage };
