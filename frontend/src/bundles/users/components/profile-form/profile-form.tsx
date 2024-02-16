import { BaseButton, Input } from '~/bundles/common/components/components';
import { useAppForm, useCallback } from '~/bundles/common/hooks/hooks';

type UserDto = { // TODO: dummy user payload, remove
    firstName?: string;
    lastName?: string;
    email?: string;
};

type Properties = {
    onSubmit: (payload: UserDto) => void;
};

const ProfileForm: React.FC<Properties> = ({ onSubmit }) => {
    const { control, errors, handleSubmit } = useAppForm<UserDto>(
        {
            defaultValues: {}
        }
    );

    const handleFormSubmit = useCallback(
        (event_: React.BaseSyntheticEvent): void => {
            void handleSubmit(onSubmit)(event_);
        },
        [handleSubmit, onSubmit],
    );

    return (
            <form onSubmit={handleFormSubmit}>
                <div>
                    <Input
                        name="firstName"
                    />
                    <Input
                        name="lastName"
                    />
                    <Input
                        name="email"
                    />
                </div>
                <div>
                    <BaseButton>Save</BaseButton>
                </div>
            </form>
    );
};

export { ProfileForm };
