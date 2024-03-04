import 'react-toastify/dist/ReactToastify.min.css';

import { useCallback, useContext, useRef, useState } from 'react';

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
    Dropdown,
    Footer,
    Header,
    Icon,
    NavTabs,
    RadioButton,
    RegularButton,
    Switch,
    Tooltip,
} from '../../bundles/common/components/components.js';
import { Auth } from '../auth/pages/auth';
import { UserProfile } from '../common/components/layout/header/user-profile/user-profile.js';
import { Stepper } from '../common/components/stepper/stepper.js';
import { CalendarTypes } from '../common/enums/calendar/calendar-types.enum';
import { TooltipDimensions } from '../common/enums/enums';
import { useTakeScreenShot } from '../common/hooks/use-take-screenshot/use-take-screenshot.hook.js';
import { EditTemplatePage } from '../edit-temlate/edit-template';
import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import { QuestionAndAnswer } from '../question-and-answer/question-and-answer';
import { DeleteResumeButton } from '../resume/components/delete-resume-button/delete-resume-button.js';
import styles from './styles.module.scss';

const steps = [
    { label: 'Create resume' },
    { label: 'Choose plan' },
    { label: 'Payment details' },
    { label: 'Download resume' },
];

const navbarItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Login', path: AppRoute.LOG_IN },
    { label: 'Signup', path: AppRoute.SIGN_UP },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const headerItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Templates', path: AppRoute.TEMPLATES },
];

const dropdownOptions = [
    {
        label: 'Native speaker',
        value: 'C1',
    },
    {
        label: 'Highly proficient',
        value: 'B2',
    },
    {
        label: 'Very good command',
        value: 'B1',
    },
];

const PreviewPage: React.FC = () => {
    const { showToast } = useContext(ToastContext);
    const { screenshot, takeScreenshot } = useTakeScreenShot();
    const screenShotReference = useRef(null);
    const [activeStep, setActiveStep] = useState(0);

    const handleGoToNextStep = useCallback(() => {
        if (activeStep < steps.length) {
            setActiveStep(activeStep + 1);
        }
    }, [activeStep]);

    const handleTakeScreenshot = useCallback(() => {
        void takeScreenshot({
            ref: screenShotReference,
            convertOptions: {
                quality: 0.9,
                type: 'image/png',
            },
            options: {
                scale: 1,
            },
        });
    }, [takeScreenshot]);
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

    const handleDropdownChange = useCallback((value: string | undefined) => {
        return value;
    }, []);

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
                        <Header>
                            <NavTabs items={headerItems}></NavTabs>
                            <UserProfile image="https://avatars.githubusercontent.com/u/810438?v=4" />
                        </Header>
                    </li>
                    <li className={styles.item}>
                        <Footer>
                            <div className={styles.footer__actions}>
                                <RegularButton variant={ButtonVariant.OUTLINED}>
                                    Edit template
                                </RegularButton>
                                <RegularButton variant={ButtonVariant.PRIMARY}>
                                    Save & Publish
                                </RegularButton>
                            </div>
                        </Footer>
                    </li>
                    <li className={styles.item}>
                        <Dropdown
                            name="language"
                            className={styles.dropdown}
                            options={dropdownOptions}
                            label="Select level"
                            onChange={handleDropdownChange}
                        />
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
                    <li>
                        <DeleteResumeButton />
                    </li>
                    <li className={styles.item}>
                        <Calendar initDate={{ year: 1500, month: 9 }} />
                        <Calendar
                            initDate={{ present: true }}
                            type={CalendarTypes.withPresent}
                        />
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
                        <div ref={screenShotReference}>
                            <EditTemplatePage />
                        </div>
                    </li>
                    <li className={styles.item}>
                        <Stepper steps={steps} activeStep={activeStep} />
                        <RegularButton onClick={handleGoToNextStep}>
                            Next
                        </RegularButton>
                    </li>
                    <li className={styles.item}>
                        <RegularButton onClick={handleTakeScreenshot}>
                            Take a Screenshot of Edit Templates
                        </RegularButton>
                        <div>
                            {screenshot && (
                                <img src={screenshot} alt="screenshot" />
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export { PreviewPage };
