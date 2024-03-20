import { AppRoute } from '~/bundles/common/enums/app-route.enum';

const NoHeaderRoutes = [
    AppRoute.LOG_IN,
    AppRoute.SIGN_UP,
    AppRoute.FORGOT_PASSWORD,
    AppRoute.CHECK_EMAIL,
    AppRoute.EMAIL_CONFIRMATION,
    AppRoute.EMAIL_CONFIRMATION_FAIL,
    AppRoute.EMAIL_CONFIRMATION_SUCCESS,
];

export { NoHeaderRoutes };
