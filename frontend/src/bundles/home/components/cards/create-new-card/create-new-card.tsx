import { Link } from 'react-router-dom';

import { AppRoute } from '~/bundles/common/enums/app-route.enum';

import { PlusCircleIcon } from '../../icons/plus-circle-icon';
import styles from './styles.module.scss';

const CreateNewCard: React.FC = () => {
    return (
        <Link to={AppRoute.RESUME_CREATE}>
            <div className={styles.create_new_card}>
                <PlusCircleIcon />
                <span>Create new</span>
            </div>
        </Link>
    );
};

export { CreateNewCard };
