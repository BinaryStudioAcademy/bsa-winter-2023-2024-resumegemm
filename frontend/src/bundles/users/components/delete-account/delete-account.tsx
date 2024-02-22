import { BaseButton } from '~/bundles/common/components/components';
import { ButtonVariant } from '~/bundles/common/enums/enums';

import styles from './style.module.scss';

const DeleteAccount: React.FC = () => {
    return (
        <div className={styles.profile__delete}>
            <p>
                Once you delete your account, it cannot be undone. This is
                permanent.
            </p>
            <BaseButton variant={ButtonVariant.PRIMARY}>Delete</BaseButton>
        </div>
    );
};

export { DeleteAccount };
