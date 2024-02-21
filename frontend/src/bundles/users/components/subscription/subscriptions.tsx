import styles from './style.module.scss';
import { SubscriptionItem } from './subscription-item';

const Subscriptions: React.FC = () => {
    return (
        <div className={styles.subscription}>
            <SubscriptionItem
                title="Resume Analytics"
                info="Discounts, special offers, new features and more."
            />
            <SubscriptionItem
                title="Resume and Job Tips Newsletter"
                info="Views, downloads and monthly statistics for each resume."
            />
            <SubscriptionItem
                title="Resume and Job Tips Newsletter"
                info="Useful resume and job tips! Straight to your inbox every 2 weeks."
            />
            <SubscriptionItem
                title="Career Plans"
                info="Get notified when career planning is available."
            />
        </div>
    );
};

export { Subscriptions };
