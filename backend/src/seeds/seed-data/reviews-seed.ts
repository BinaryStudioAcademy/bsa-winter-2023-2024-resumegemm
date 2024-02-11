import { DatabaseColumnName } from '~/common/database/enums/enums.js';

const reviewsSeed = [
    {
        [DatabaseColumnName.COMMENT]: 'Great job!',
        [DatabaseColumnName.SCORE]: 5,
    },
    {
        [DatabaseColumnName.COMMENT]: 'Could be better.',
        [DatabaseColumnName.SCORE]: 3,
    },
    {
        [DatabaseColumnName.COMMENT]: 'Well done.',
        [DatabaseColumnName.SCORE]: 4,
    },
    {
        [DatabaseColumnName.COMMENT]: 'I wish I hadn&apos;t seen it.',
        [DatabaseColumnName.SCORE]: 2,
    },
];

export { reviewsSeed };
