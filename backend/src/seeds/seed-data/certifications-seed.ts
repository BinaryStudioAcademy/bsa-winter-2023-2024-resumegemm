const certificationsSeed = [
    {
        certification_name: 'AWS Certified Solutions Architect - Associate',
        authority: 'Amazon Web Services',
        start_date: new Date(2019, 0),
        end_date: new Date(2020, 7),
        certification_url_or_code: 'https://www.aws.training/certification',
        description:
            'This certification validates technical expertise in designing and deploying scalable, highly available, and fault-tolerant systems on AWS.',
    },
    {
        certification_name:
            'Microsoft Certified: Azure Administrator Associate',
        authority: 'Microsoft',
        start_date: new Date(2022, 2),
        end_date: new Date(2022, 10),
        certification_url_or_code:
            'https://docs.microsoft.com/en-us/learn/certifications/azure-administrator',
        description:
            'This certification validates skills in implementing, monitoring, and maintaining Microsoft Azure solutions, including major services related to compute, storage, network, and security.',
    },
];

export { certificationsSeed };
