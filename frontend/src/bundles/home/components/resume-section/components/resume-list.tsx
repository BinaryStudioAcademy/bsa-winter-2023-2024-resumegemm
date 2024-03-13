import React from 'react';
import { type ResumeShareAccessResponseDto } from 'shared/build/bundles/resumes/types/resume-share-access-response-dto.type';

import { ResumeCard } from '~/bundles/home/components/components';
import { type ResumeGetItemResponseDto } from '~/bundles/resume/types/types';

type AdaptResumeProperties = {
    id: string;
    image: string;
    title: string;
    resumeTitle?: string;
    createdAt: string;
    updatedAt?: string | undefined;
    deletedAt: string | null;
    userId: string;
    templateId: string;
};

const adaptResume = (resume: AdaptResumeProperties): AdaptResumeProperties => {
    return {
        ...resume,
        title: resume.resumeTitle ?? '',
    };
};

const formatDate = (date: string): string => {
    const unpatedAtDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(unpatedAtDate);
};

type ResumeListProperties = {
    resumes: ResumeGetItemResponseDto[];
    resumeViewHistory: Record<string, ResumeShareAccessResponseDto[]>;
};

const ResumeList: React.FC<ResumeListProperties> = ({
    resumes,
    resumeViewHistory,
}) => {
    const getViewedResumeCount = (resumeId: string): number => {
        return resumeViewHistory[resumeId]?.length || 0;
    };

    if (resumes.length === 0) {
        return null;
    }

    return (
        <>
            {resumes.map((resume) => {
                const adaptedResume = adaptResume(resume.resume);
                const { id, image, title, updatedAt } = adaptedResume;
                const viewedResumeCount = getViewedResumeCount(id);
                let formattedDate = '';
                if (updatedAt) {
                    formattedDate = formatDate(updatedAt);
                }
                return (
                    <ResumeCard
                        key={id}
                        title={title}
                        image={image}
                        subtitle={`Updated - ${formattedDate}`}
                        viewedResume={viewedResumeCount}
                    />
                );
            })}
        </>
    );
};

export { ResumeList };
