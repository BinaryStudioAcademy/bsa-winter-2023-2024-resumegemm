import { HttpCode } from 'shared/build';

const isServerErrorRange = (status: number): boolean => {
    return (
        status > HttpCode.FORBIDDEN && status <= HttpCode.INTERNAL_SERVER_ERROR
    );
};

export { isServerErrorRange };
