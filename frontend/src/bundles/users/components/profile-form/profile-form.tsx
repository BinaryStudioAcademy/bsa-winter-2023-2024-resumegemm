import { Input, RegularButton } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { ButtonVariant } from '~/bundles/common/enums/enums';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';
import { useFormFieldCreator } from '~/bundles/common/hooks/use-form-field-creator/use-form-field-creator.hook';

import styles from './style.module.scss';

type UserDto = {
    firstName: string;
    lastName: string;
    email: string;
};

type Properties = {
    onSubmit: (payload: UserDto) => void;
    user: UserDto;
};

const ProfileForm: React.FC<Properties> = ({ onSubmit, user }) => {
    const { handleSubmit, control } = useAppForm<UserDto>({
        defaultValues: user,
    });
    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );
    return (
        <form>
            <div className={styles.profile__form}>
                <div className={styles.profile__form__section}>
                    <FormGroup label="First Name" width="100%">
                        <Input
                            type="text"
                            {...useFormFieldCreator({
                                name: 'firstName',
                                control,
                            })}
                        />
                    </FormGroup>
                    <FormGroup label="Last Name" width="100%">
                        <Input
                            type="text"
                            {...useFormFieldCreator({
                                name: 'lastName',
                                control,
                            })}
                        />
                    </FormGroup>
                </div>
                <div className={styles.profile__form__section}>
                    <FormGroup label="Email" width="100%">
                        <Input
                            type="text"
                            {...useFormFieldCreator({
                                name: 'email',
                                control,
                            })}
                            disabled={true}
                        />
                    </FormGroup>
                    <p className={styles.profile__form__section__paragraph}>
                        Use this email to log in to your ResumeGemm account and
                        receive notifications.
                    </p>
                </div>
            </div>
            <div className={styles.profile__button_wrapper}>
                <RegularButton
                    variant={ButtonVariant.PRIMARY}
                    onClick={handleFormSubmit}
                >
                    Save
                </RegularButton>
            </div>
        </form>
    );
};

export { ProfileForm };
