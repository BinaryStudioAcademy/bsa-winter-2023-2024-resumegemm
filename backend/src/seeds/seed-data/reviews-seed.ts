import { DatabaseColumnName } from '~/common/database/enums/enums.js';

const currentTimestamp = new Date();

const reviewsSeed = [
    {
        [DatabaseColumnName.COMMENT]: 'Great job!',
        [DatabaseColumnName.SCORE]: 5,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
    },
    {
        [DatabaseColumnName.COMMENT]: 'Could be better.',
        [DatabaseColumnName.SCORE]: 3,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
    },
    {
        [DatabaseColumnName.COMMENT]: 'Well done.',
        [DatabaseColumnName.SCORE]: 4,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
    },
    {
        [DatabaseColumnName.COMMENT]: 'I wish I hadn&apos;t seen it.',
        [DatabaseColumnName.SCORE]: 2,
        created_at: currentTimestamp,
        updated_at: currentTimestamp,
    },
];

export { reviewsSeed };
