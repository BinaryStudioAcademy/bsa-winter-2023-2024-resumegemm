import {
    type ChangeEvent,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ApiPath } from 'shared/build';

import { BaseButton, Input } from '~/bundles/common/components/components';
import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';
import { ResumePreview } from '~/bundles/resume-preview/components/components';
import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { baseUrl } from '~/helpers/base-url';

import { ResumeApiPath } from '../enums/enums';
import { ResumeAccessMessage } from '../enums/messages';
import {
    accessResume,
    accessResumeDetails,
    createResumeAccess,
    deleteAccessResume,
} from '../store/actions';
import styles from './styles.module.scss';

const ResumeAccess: React.FC = () => {
    const [resumeIdInput, setResumeIdInput] = useState<string | null>(null);

    const { showToast } = useContext(ToastContext);

    const handleIdChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setResumeIdInput(event.currentTarget.value);
        },
        [],
    );

    const navigate = useNavigate();

    const { id } = useParams();

    const dispatch = useAppDispatch();

    const resumeIdSelector = useAppSelector(
        ({ resumeAccess }) => resumeAccess.resumeId,
    );

    const details = useAppSelector(({ resumeAccess }) => resumeAccess.details);

    const deleteResumeAccess = useCallback(() => {
        if (!id) {
            return;
        }

        void dispatch(deleteAccessResume({ id }))
            .unwrap()
            .then(() => {
                navigate('/');
            });
    }, [dispatch, id, navigate]);

    const createResumeAccessCallback = useCallback(() => {
        if (!resumeIdInput) {
            showToast(ResumeAccessMessage.EMPTY_ID, ToastType.ERROR);
            return;
        }

        void dispatch(createResumeAccess({ resumeId: resumeIdInput }))
            .unwrap()
            .then((payload) => {
                const linkId = payload.id;

                showToast(
                    `Created link: ${baseUrl()}${
                        ApiPath.RESUMES
                    }${ResumeApiPath.SHARE_ID(linkId)}`,
                    ToastType.SUCCESS,
                );
            })
            .catch((error: Error) => {
                showToast(error.message, ToastType.ERROR);
            });
    }, [dispatch, resumeIdInput, showToast]);

    useEffect(() => {
        if (!id) {
            return;
        }

        void dispatch(accessResume({ id }));
        void dispatch(accessResumeDetails({ id }));
    }, [dispatch, id]);

    return (
        <div>
            <p>resume id: {resumeIdSelector}</p>
            <div className={styles.resume_access__id_input_container}>
                <Input onChange={handleIdChange}></Input>
                <BaseButton onClick={createResumeAccessCallback}>
                    Create share link
                </BaseButton>
            </div>
            <div>
                <p>Details:</p>
                {JSON.stringify(details)}
            </div>
            <BaseButton onClick={deleteResumeAccess}>Delete link</BaseButton>
            <ResumePreview />
        </div>
    );
};

export { ResumeAccess };
