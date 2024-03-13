import { ApiPath, ResumesApiPath } from 'shared/build';

import { baseUrl } from '~/helpers/base-url';

const getResumeLinkWithId = (linkId: string): string =>
    `${baseUrl()}${ApiPath.RESUMES}${ResumesApiPath.SHARE_ID(linkId)}`;

export { getResumeLinkWithId };
