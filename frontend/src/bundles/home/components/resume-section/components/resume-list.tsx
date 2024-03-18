import { NavLink } from 'react-router-dom';

import { useResumes } from '~/bundles/common/hooks/hooks';

import { ResumeCard } from '../../components';

const ResumeList: React.FC = () => {
    const { resumes, resumeViews, deleteResume } = useResumes();

    const resumeDataToRender = resumeViews.map((resumeWithViewsCount) => {
        const authUserResumes = resumes.find(
            (resume) => resume.id === resumeWithViewsCount.resumeId,
        );
        return {
            ...authUserResumes,
            ...resumeWithViewsCount,
        };
    });

    return (
        <>
            {resumeDataToRender.map(
                ({ id, image, updatedAt, views, title }) => {
                    return (
                        <NavLink key={id} to={`/resumes/${id}`}>
                            <ResumeCard
                                key={id}
                                title={title}
                                image={image}
                                subtitle={`Updated - ${updatedAt}`}
                                viewedResume={views}
                                onDelete={deleteResume}
                            />
                        </NavLink>
                    );
                },
            )}
        </>
    );
};

export { ResumeList };
