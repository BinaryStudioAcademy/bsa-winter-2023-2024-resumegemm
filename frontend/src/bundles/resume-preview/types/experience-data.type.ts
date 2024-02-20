type ExperienceData = {
    company_logo: string;
    job_position: string;
    company: string;
    employment_type: string;
    location_type: string;
    start_date: string;
    end_date: string;
    work_location: {
        city: string;
        state: string;
        country: string;
    };
    description: string[];
};

export { type ExperienceData };
