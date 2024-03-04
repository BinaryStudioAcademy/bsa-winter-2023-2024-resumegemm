import { titles } from '../titles/titles';

const updatePageTab = (): void => {
    const title = titles[location.pathname];
    if (title) {
        document.title = title;
        return;
    }

    document.title = 'Resume Gemm';
};

export { updatePageTab };
