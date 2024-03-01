const AppRoute = {
    ROOT: '/',
    LOG_IN: '/log-in',
    SIGN_UP: '/sign-up',
    PREVIEW: '/preview',
    PAYMENT: '/payment',
    PROFILE: '/profile',
    EMAIL_SUBSCRIPTION: '/email-subscription/unsubscribe/:id',
    HOME: '/home',
    TEMPLATES: '/templates',
} as const;

export { AppRoute };
