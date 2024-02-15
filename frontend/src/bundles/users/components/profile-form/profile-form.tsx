import { Button, Input } from '~/bundles/common/components/components';
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
                        control={control}
                        errors={errors}
                        label="First Name"
                        name="firstName"
                    />
                    <Input
                        control={control}
                        errors={errors}
                        label="Last Name"
                        name="lastName"
                    />
                    <Input
                        control={control}
                        errors={errors}
                        label="Email"
                        name="email"
                    />
                </div>
                <div>
                    <Button>Save</Button>
                </div>
            </form>
    );
};

export { ProfileForm };
