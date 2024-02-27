import { OpenAuthApiPath } from 'shared/build/index.js';

import { socialMediaSvg } from '~/assets/img/social-media/social-media-svg';

const socialMediaLinksWithIcons = [
    [OpenAuthApiPath.GITHUB, socialMediaSvg.Github],
    [OpenAuthApiPath.GOOGLE, socialMediaSvg.Google],
];

export { socialMediaLinksWithIcons };
