enum AppRoute {
    ROOT = '/',
    LOG_IN = '/log-in',
    SIGN_UP = '/sign-up',
    PREVIEW = '/preview',
    PAYMENT = '/payment',
    PROFILE = '/profile',
    RESUME = '/resumes/:id',
    RESUME_EDIT = '/resumes/edit',
    RESUME_CREATE = '/resumes/create',
    RESUME_ACCESS = '/resumes/share/:id',
    HOME = '/home',
    TEMPLATES = '/templates',
    STATISTICS = '/statistics',
    TEMPLATE = '/template',
    TEMPLATE_EDITOR = '/template-editor',
    FORGOT_PASSWORD = '/forgot-password',
    QA = '/qa',
}

export { AppRoute };
