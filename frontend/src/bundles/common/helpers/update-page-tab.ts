import { titles } from '../titles/titles';

const updatePageTab = (): void => {
    const title = titles[location.pathname];

    title ? (document.title = title) : (document.title = 'Resume Gemm');
};

export { updatePageTab };
