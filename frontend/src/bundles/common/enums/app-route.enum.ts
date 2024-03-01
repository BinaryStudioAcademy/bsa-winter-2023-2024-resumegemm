const AppRoute = {
    ROOT: '/',
    LOG_IN: '/log-in',
    SIGN_UP: '/sign-up',
    PREVIEW: '/preview',
    PAYMENT: '/payment',
    PROFILE: '/profile',
    RESUME_ACCESS: '/resumes/share/:id',
    HOME: '/home',
    TEMPLATES: '/templates',
} as const;

export { AppRoute };
