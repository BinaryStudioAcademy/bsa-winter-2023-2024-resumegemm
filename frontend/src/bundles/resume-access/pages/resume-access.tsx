import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '~/bundles/common/hooks/hooks';

import { accessResume } from '../store/actions';

const ResumeAccess: React.FC = () => {
    const { id } = useParams();

    const dispatch = useAppDispatch();

    const resumeIdSelector = useAppSelector(
        (resumeAccess) => resumeAccess.resumeAccess.resumeId,
    );
    const [resumeId, setResumeId] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        void dispatch(accessResume({ id }));
    }, [dispatch, id]);

    useEffect(() => {
        setResumeId(resumeIdSelector);
    }, [resumeIdSelector]);

    return <div>resume id: {resumeId}</div>;
};

export { ResumeAccess };
