import { CommonMessage, ToastType } from '~/bundles/toast/enums/enums.js';
import { showToast } from '~/bundles/toast/helpers/show-toast';

import { getResumeLinkWithId } from './get-resume-link-with-id.helper.js';

const copyLinkToClipboardAndShowToast = (linkId: string): void => {
    const linkToResume = getResumeLinkWithId(linkId);
    void navigator.clipboard.writeText(linkToResume);
    showToast(CommonMessage.SUCCESS_LINK_COPY, ToastType.SUCCESS, {
        position: 'top-right',
    });
};

export { copyLinkToClipboardAndShowToast };
