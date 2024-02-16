import { BaseButton } from '~/bundles/common/components/components.js';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
    <>
        <h1>Sign In</h1>
        <form>
            <BaseButton>Sign in</BaseButton>
        </form>
    </>
);

export { SignInForm };
