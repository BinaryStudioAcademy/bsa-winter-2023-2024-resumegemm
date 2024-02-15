import { Button } from '~/bundles/common/components/components.js';

type Properties = {
    onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
    <>
        <h1>Sign In</h1>
        <form>
        <Button type='submit'>Sign in</Button>
        </form>
    </>
);

export { SignInForm };
