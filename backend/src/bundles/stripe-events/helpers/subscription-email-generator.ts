import { type SendMailOptions } from 'nodemailer';

import { EmailPayload } from '../constants/email-payload.js';
import { type SubscriptionDetails } from '../types/types';

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
    subject = 'Subscription',
    name,
    start,
    end,
    items,
    description,
}: SubscriptionDetails): SendMailOptions => {
    const textContent = `Congratulations ${name} on successful subscription. Your subscription details are:
        Start Date: ${new Date(start * 1000).toLocaleDateString()}
        End Date: ${new Date(end * 1000).toLocaleDateString()}
        Description: ${description}`;

    let descriptionBlock = '';

    if (description) {
        descriptionBlock = `<li><strong>Description:</strong> ${description}</li>`;
    }

    const templateVariables = {
        name,
        startDate: new Date(start * 1000).toLocaleDateString(),
        endDate: new Date(end * 1000).toLocaleDateString(),
        descriptionBlock,
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
