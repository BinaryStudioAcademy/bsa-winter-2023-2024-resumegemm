import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '~/bundles/common/hooks/hooks';

import { accessResume } from '../store/actions';
import { type ResumeShareGetResponseDto } from '../types/types';
import styles from './styles.module.scss';

const ResumeAccess: React.FC = () => {
    const [resume, setResume] = useState<
        ResumeShareGetResponseDto['resume'] | null
    >(null);

    const { id } = useParams();

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!id) {
            return;
        }

        const getResume = async (): Promise<void> => {
            const { resume } = await dispatch(accessResume({ id })).unwrap();

            setResume(resume);
        };

        void getResume();
    }, [dispatch, id]);

    return (
        <div className={styles.resume_container}>
            {resume && (
                <>
                    <h3 className={styles.resume__title}>
                        {resume.resumeTitle}
                    </h3>
                    <img
                        className={styles.resume__image}
                        src={resume.image}
                        alt="Resume preview"
                    />
                </>
            )}
        </div>
    );
};

export { ResumeAccess };
