import { getUser } from '../auth/store/actions';
import {
    useAppDispatch,
    useAppSelector,
    useEffect,
} from '../common/hooks/hooks';
import { Templates } from '../home/pages/templates';

const TemplatePage = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            void dispatch(getUser());
        }
    }, [user, dispatch]);

    return <Templates />;
};

export { TemplatePage };
