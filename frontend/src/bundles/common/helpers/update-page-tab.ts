import { titles } from '../titles/titles';

const updatePageTab = (): void => {
    const title = titles[location.pathname];
    document.title = title || 'ResumeGemm';
};

export { updatePageTab };
