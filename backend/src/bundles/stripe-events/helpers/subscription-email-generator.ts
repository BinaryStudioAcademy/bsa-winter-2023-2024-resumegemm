import { type SendMailOptions } from 'nodemailer';

import { EmailPayload } from '../constants/email-payload.js';
import { EmailSubject } from '../enums/email-subject.enum.js';
import { type SubscriptionDetails } from '../types/types';

const MILLIS_TO_SECOND = 1000;

const loadAndReplaceTemplate = (variables: Record<string, string>): string => {
    let htmlContent: string = EmailPayload.HTML;
    for (const key of Object.keys(variables)) {
        const regex = new RegExp(`{${key}}`, 'g');
        htmlContent = htmlContent.replace(regex, variables[key]);
    }

    return htmlContent;
};

const generateSubscriptionEmailPayload = ({
    email,
    subject = EmailSubject.SUBSCRIPTION,
    name,
    current_period_start,
    current_period_end,
}: SubscriptionDetails): SendMailOptions => {
    const startDate = new Date(
        current_period_start * MILLIS_TO_SECOND,
    ).toLocaleDateString();
    const endDate = new Date(
        current_period_end * MILLIS_TO_SECOND,
    ).toLocaleDateString();

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
