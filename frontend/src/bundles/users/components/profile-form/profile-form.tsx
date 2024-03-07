import { BaseButton, Input } from '~/bundles/common/components/components';
import { FormGroup } from '~/bundles/common/components/form-group/form-group';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';

import styles from './style.module.scss';

type UserDto = {
    // TODO: dummy user payload, remove
    firstName?: string;
    lastName?: string;
    email?: string;
};

type Properties = {
    onSubmit: (payload: UserDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ onSubmit }) => {
    const { handleSubmit } = useAppForm<UserDto>({
        defaultValues: {},
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
                        <Input name="firstName" />
                    </FormGroup>
                    <FormGroup label="Last Name" width="100%">
                        <Input name="lastName" />
                    </FormGroup>
                </div>
                <div className={styles.profile__form__section}>
                    <FormGroup label="Email" width="100%">
                        <Input name="email" />
                    </FormGroup>
                    <p>
                        Use this email to log in to your ResumeGemm account and
                        receive notifications.
                    </p>
                </div>
            </div>
            <div>
                <BaseButton onClick={handleFormSubmit}>Save</BaseButton>
            </div>
        </form>
    );
};

export { ProfileForm };
