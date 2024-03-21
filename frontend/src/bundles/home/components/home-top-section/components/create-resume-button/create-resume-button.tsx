import { NavLink } from 'react-router-dom';
import { type TemplateDto } from 'shared/build/bundles/templates/types/template-dto.type';

import { RegularButton } from '~/bundles/common/components/components';
import { AppRoute } from '~/bundles/common/enums/enums';
import { useReducer } from '~/bundles/common/hooks/hooks';

import { PlusCircleIcon } from '../../../icons/plus-circle-icon';
import { ResumeIcon } from '../../../icons/resume-icon';
import styles from './styles.module.scss';

type CreateResumeButtonPayload = {
    templates: TemplateDto[];
};

const CreateResumeButton: React.FC<CreateResumeButtonPayload> = ({
    templates,
}) => {
    const [isPopUpShown, togglePopUp] = useReducer(
        (isShown) => !isShown,
        false,
    );

    const [firstTemplate, secondTemplate] = templates;

    return (
        <div className={styles.container}>
            {isPopUpShown && (
                <div className={styles.templates__container}>
                    <NavLink
                        to={`${AppRoute.RESUME_CREATE}/${firstTemplate.id}`}
                    >
                        <img
                            className={styles.templates__container__image}
                            src={firstTemplate.image}
                            alt={firstTemplate.name}
                        />
                    </NavLink>
                    <NavLink
                        to={`${AppRoute.RESUME_CREATE}/${secondTemplate.id}`}
                    >
                        <img
                            className={styles.templates__container__image}
                            src={secondTemplate.image}
                            alt={secondTemplate.name}
                        />
                    </NavLink>
                </div>
            )}
            <RegularButton
                onClick={togglePopUp}
                className={styles.create_resume_button}
            >
                <div className={styles.create_resume_button__icon}>
                    <PlusCircleIcon
                        className={
                            styles.create_resume_button__icon__plus_circle
                        }
                    />
                    <ResumeIcon
                        className={styles.create_resume_button__icon__resume}
                    />
                </div>
                <span className={styles.create_resume_button__text}>
                    Create a resume
                </span>
            </RegularButton>
        </div>
    );
};

export { CreateResumeButton };
