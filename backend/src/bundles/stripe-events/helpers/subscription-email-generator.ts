import { type SendMailOptions } from 'nodemailer';

import { EmailPayload } from '../constants/email-payload.js';
import { EmailSubject } from '../enums/email-subject.enum.js';
import { type SubscriptionDetails } from '../types/types';
import { formatDate } from './format-date.js';

const loadAndReplaceTemplate = (variables: Record<string, string>): string => {
    let htmlContent = EmailPayload.HTML;
    for (const [key, value] of Object.entries(variables)) {
        htmlContent = htmlContent.split(`{${key}}`).join(value);
    }

    return htmlContent;
};

const generateSubscriptionEmailPayload = ({
    email,
    subject = EmailSubject.SUBSCRIPTION,
    name,
    currentPeriodStart,
    currentPeriodEnd,
}: SubscriptionDetails): SendMailOptions => {
    const startDate = formatDate(currentPeriodStart);
    const endDate = formatDate(currentPeriodEnd);

    const textContent = `Congratulations ${name} on successful subscription. Your subscription details are:
        Start Date: ${startDate}
        End Date: ${endDate}`;

    const templateVariables = {
        name,
        startDate,
        endDate,
    };
    const htmlContent = loadAndReplaceTemplate(templateVariables);

    return {
        to: email,
        subject,
        text: textContent,
        html: htmlContent,
    };
};

export { generateSubscriptionEmailPayload };
