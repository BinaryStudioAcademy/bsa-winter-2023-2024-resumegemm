import { AppRoute } from '~/bundles/common/enums/enums.js';

import {
    Calendar,
    Checkbox,
    NavTabs,
    RadioButton,
    Switch,
    Tooltip,
} from '../../bundles/common/components/components.js';
import { Auth } from '../auth/pages/auth';
import { CalendarTypes } from '../common/enums/calendar/calendar-types.enum';
import { TooltipDimensions } from '../common/enums/enums';
import { EditTemplatePage } from '../edit-temlate/edit-template';
import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import styles from './styles.module.scss';

const navbarItems = [
    { label: 'Home', path: AppRoute.ROOT },
    { label: 'Signin', path: AppRoute.SIGN_IN },
    { label: 'Signup', path: AppRoute.SIGN_UP },
    { label: 'Preview', path: AppRoute.PREVIEW },
];

const PreviewPage: React.FC = () => {
    return (
        <div className={styles.preview}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <div className={styles.example}>Component preview</div>
                </li>
                <li className={styles.item}>
                    <NavTabs items={navbarItems}></NavTabs>
                </li>
                <li className={styles.item}>
                    <Checkbox name="preview-page-checkbox" label="Checkbox" />
                    <RadioButton label="Radio button" />
                    <Switch label="Switch" />
                </li>
                <li className={styles.item}>
                    <Calendar />
                    <Calendar type={CalendarTypes.withPresent} />
                    <div className={styles.tooltip_small_example_container}>
                        <Tooltip
                            dimensionType={TooltipDimensions.expand100Percent}
                            text="tooltip text"
                        />
                    </div>
                    <div className={styles.tooltip_big_example_container}>
                        <Tooltip
                            dimensionType={TooltipDimensions.expand100Percent}
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
                    <EditTemplatePage />
                </li>
            </ul>
        </div>
    );
};

export { PreviewPage };
