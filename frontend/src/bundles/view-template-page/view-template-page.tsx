import { useNavigate, useParams } from 'react-router-dom';

import { Footer, Header, RegularButton } from '../common/components/components';
import { AppRoute, ButtonType, ButtonVariant } from '../common/enums/enums';
import {
    useAppDispatch,
    useCallback,
    useEffect,
    useState,
} from '../common/hooks/hooks';
import { actions as templateActions } from '../edit-template/store/edit-template.store';
import { type TemplateDto } from '../templates-page/types/types';
import { ToastType } from '../toast/enums/show-toast-types.enum';
import { showToast } from '../toast/helpers/show-toast';
import styles from './styles.module.scss';

const ViewTemplatePage: React.FC = () => {
    const { id } = useParams();
    const [template, setTemplate] = useState<TemplateDto | null>(null);
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id) {
            dispatch(templateActions.getTemplateById(id))
                .unwrap()
                .then((template) => setTemplate(template))
                .catch((error) => showToast(error, ToastType.ERROR));
        }
    }, [dispatch, id]);

    const editTemplateHandler = useCallback(() => {
        navigate(`${AppRoute.TEMPLATE_EDITOR}/${template?.id}`);
    }, [navigate, template]);

    const returnBackHandler = useCallback(() => {
        navigate(AppRoute.TEMPLATES);
    }, [navigate]);

    return (
        <>
            <Header />
            <section className={styles.template_section}>
                {template && (
                    <img
                        className={styles.template__image}
                        src={template.image}
                        alt="Template"
                    />
                )}
            </section>
            <Footer>
                <div className={styles.footer__controls}>
                    <RegularButton
                        type={ButtonType.BUTTON}
                        variant={ButtonVariant.OUTLINED}
                        onClick={returnBackHandler}
                    >
                        Go back
                    </RegularButton>
                    <RegularButton
                        type={ButtonType.BUTTON}
                        variant={ButtonVariant.PRIMARY}
                        onClick={editTemplateHandler}
                    >
                        Edit template
                    </RegularButton>
                </div>
            </Footer>
        </>
    );
};

export { ViewTemplatePage };
