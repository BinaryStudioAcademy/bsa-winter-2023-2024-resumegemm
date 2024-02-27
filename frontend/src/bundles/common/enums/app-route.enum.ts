const AppRoute = {
    ROOT: '/',
    SIGN_IN: '/sign-in',
    SIGN_UP: '/sign-up',
    PREVIEW: '/preview',
    PAYMENT: '/payment',
    PROFILE: '/profile',
    EMAIL_SUBSCRIPTION: '/email-subscription/unsubscribe/:id',
} as const;

export { AppRoute };
