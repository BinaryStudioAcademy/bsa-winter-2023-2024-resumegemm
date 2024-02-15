import { Calendar, Checkbox, RadioButton, Switch, Tooltip } from '../common/components/components';
import { CalendarTypes } from '../common/enums/calendar/calendar-types.enum';
import { TooltipDimensions } from '../common/enums/enums';
import { Home } from '../home/pages/home';
import { Templates } from '../home/pages/templates';
import styles from './styles.module.scss';

const PreviewPage: React.FC = () => {
    return (
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
                    <Calendar />
                    <Calendar type={CalendarTypes.withPresent} />
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
    );
};

export { PreviewPage };
