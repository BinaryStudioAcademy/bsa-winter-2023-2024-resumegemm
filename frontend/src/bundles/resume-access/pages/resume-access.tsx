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
import { ToastContext } from '~/bundles/toast/context/toast-context';
import { ToastType } from '~/bundles/toast/enums/show-toast-types.enum';
import { baseUrl } from '~/helpers/base-url';

import { ResumesApiPath } from '../enums/enums';
import { ResumeAccessMessage } from '../enums/messages';
import {
    accessResume,
    createResumeAccess,
    deleteAccessResume,
} from '../store/actions';
import styles from './styles.module.scss';

const ResumeAccess: React.FC = () => {
    const [resumeId, setResumeId] = useState<string | null>(null);
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
        (resumeAccess) => resumeAccess.resumeAccess.resumeId,
    );

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
                    }${ResumesApiPath.SHARE_ID(linkId)}`,
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
    }, [dispatch, id]);

    useEffect(() => {
        setResumeId(resumeIdSelector);
    }, [resumeIdSelector]);

    return (
        <div>
            <p>resume id: {resumeId}</p>
            <div className={styles.resume_access__id_input_container}>
                <Input onChange={handleIdChange}></Input>
                <BaseButton onClick={createResumeAccessCallback}>
                    Create share link
                </BaseButton>
            </div>
            <BaseButton onClick={deleteResumeAccess}>Delete link</BaseButton>
        </div>
    );
};

export { ResumeAccess };
