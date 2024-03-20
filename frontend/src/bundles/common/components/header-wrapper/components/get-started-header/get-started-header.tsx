import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    AppRoute,
    ButtonSize,
    ButtonVariant,
} from '~/bundles/common/enums/enums';

import { Header, RegularButton } from '../../../components';
import styles from './styles.module.scss';

const GetStartedHeader: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = useCallback(() => {
        navigate(AppRoute.LOG_IN);
    }, [navigate]);

    return (
        <Header>
            <RegularButton
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.MEDIUM}
                className={styles.get_started_header__button}
                onClick={handleGetStarted}
            >
                <p>Get Started</p>
            </RegularButton>
        </Header>
    );
};

export { GetStartedHeader };
