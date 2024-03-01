import 'react-toastify/dist/ReactToastify.min.css';

import { useCallback, useContext } from 'react';

import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
    IconName,
} from '~/bundles/common/enums/enums.js';
import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';

import {
    Calendar,
    Checkbox,
    Icon,
    NavTabs,
    RadioButton,
    RegularButton,
    Switch,
    Tooltip,
} from '../../bundles/common/components/components.js';
import { Auth } from '../auth/pages/auth';
import { CalendarTypes } from '../common/enums/calendar/calendar-types.enum';
import { TooltipDimensions } from '../common/enums/enums';
import { EditTemplatePage } from '../edit-temlate/edit-template';
import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import { QuestionAndAnswer } from '../question-and-answer/question-and-answer';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Login', path: AppRoute.LOG_IN },
    { label: 'Signup', path: AppRoute.SIGN_UP },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const PreviewPage: React.FC = () => {
    const { showToast } = useContext(ToastContext);

    const handleSuccessButtonClick = useCallback(() => {
        showToast('Hooray!', ToastType.SUCCESS);
    }, [showToast]);

    const handleErrorButtonClick = useCallback(() => {
        showToast('Error! Whyyyyyy!?!?!?', ToastType.ERROR, {
            theme: 'dark',
        });
    }, [showToast]);

    const handleInfoButtonClick = useCallback(() => {
        showToast('Pretty informative, yeah?', ToastType.INFO, {
            theme: 'colored',
            hideProgressBar: false,
            closeButton: true,
        });
    }, [showToast]);

    return (
        <>
            <div className={styles.preview}>
                <ul className={styles.list}>
                    <li className={styles.item}>
                        <div className={styles.example}>Component preview</div>
                    </li>
                    <li className={styles.item}>
                        <NavTabs items={navbarItems}></NavTabs>
                    </li>
                    <li className={styles.item}>
                        <Checkbox
                            name="preview-page-checkbox"
                            label="Checkbox"
                        />
                        <RadioButton label="Radio button" />
                        <Switch label="Switch" />
                    </li>
                    <li className={styles.item}>
                        <RegularButton onClick={handleSuccessButtonClick}>
                            Success toast!
                        </RegularButton>
                        <RegularButton onClick={handleErrorButtonClick}>
                            Error toast!
                        </RegularButton>
                        <RegularButton onClick={handleInfoButtonClick}>
                            Info toast!
                        </RegularButton>
                    </li>
                    <li>
                        <div className={styles.buttons}>
                            <RegularButton variant={ButtonVariant.DEFAULT}>
                                Default
                            </RegularButton>
                            <RegularButton
                                prependedIcon={
                                    <Icon name={IconName.CHEVRON_DOWN} />
                                }
                                variant={ButtonVariant.GHOST}
                            >
                                Ghost
                            </RegularButton>
                            <RegularButton
                                appendedIcon={<Icon name={IconName.PLUS} />}
                                variant={ButtonVariant.OUTLINED}
                            >
                                Outlined
                            </RegularButton>
                            <RegularButton variant={ButtonVariant.PRIMARY}>
                                Primary
                            </RegularButton>
                            <RegularButton
                                appendedIcon={<Icon name={IconName.PLUS} />}
                                prependedIcon={
                                    <Icon name={IconName.CHEVRON_DOWN} />
                                }
                                size={ButtonSize.MEDIUM}
                                variant={ButtonVariant.PRIMARY}
                            >
                                Primary
                            </RegularButton>
                            <RegularButton
                                variant={ButtonVariant.SQUARE_ORANGE}
                            >
                                <Icon name={IconName.FACEBOOK} />
                            </RegularButton>
                        </div>
                    </li>
                    <li className={styles.item}>
                        <Calendar />
                        <Calendar type={CalendarTypes.withPresent} />
                        <div className={styles.tooltip_small_example_container}>
                            <Tooltip
                                dimensionType={
                                    TooltipDimensions.expand100Percent
                                }
                                text="tooltip text"
                            />
                        </div>
                        <div className={styles.tooltip_big_example_container}>
                            <Tooltip
                                dimensionType={
                                    TooltipDimensions.expand100Percent
                                }
                                text="tooltip text"
                            />
                        </div>
                        <Tooltip text="tooltip text">
                            <p>Tooltip</p>
                        </Tooltip>
                        <Home />
                    </li>
                    <li className={styles.item}>
                        <Templates />
                    </li>
                    <li className={styles.auth}>
                        <Auth />
                    </li>
                    <li className={styles.item}>
                        <QuestionAndAnswer />
                    </li>
                    <li className={styles.item}>
                        <EditTemplatePage />
                    </li>
                </ul>
            </div>
        </>
    );
};

export { PreviewPage };
