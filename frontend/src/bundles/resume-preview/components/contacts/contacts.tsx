import data from '~/bundles/resume-preview/data/resume-preview.json';

import { svg } from '../../../../assets/img/resume-preview/resume-svg';
import { ContactItem } from './components/contact-item/contact-item';
import styles from './styles.module.scss';

const Contacts: React.FC = () => {
    const {
        city,
        country,
        email,
        portfolio_url,
        linkedIn,
        styles: json_styles,
    } = data.contacts;

    const emailLink = `mailto:${email}`;
    const portfolioLink = `https://${portfolio_url}`;
    const linkedInLink = `https://${linkedIn}`;

    return (
        <div
            className={styles.resume_preview__contacts}
            style={json_styles.resume_preview__contacts}
        >
            <ul className={styles.contacts__list}>
                <ContactItem imageSrc={svg.location} imageAlt="Location Icon">
                    <p style={json_styles.contacts__item_text}>
                        {city}, <span>{country}</span>
                    </p>
                </ContactItem>
                <ContactItem imageSrc={svg.envelope} imageAlt="Phone Icon">
                    <a style={json_styles.contacts__item_text} href={emailLink}>
                        {email}
                    </a>
                </ContactItem>
                <ContactItem imageSrc={svg.portfolio} imageAlt="Portfolio Icon">
                    <a
                        style={json_styles.contacts__item_text}
                        href={portfolioLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Portfolio
                    </a>
                </ContactItem>
                <ContactItem imageSrc={svg.linkedIn} imageAlt="LinkedIn Icon">
                    <a
                        style={json_styles.contacts__item_text}
                        href={linkedInLink}
                        target="_blank"
                        rel="noreferrer"
                    >
                        LinkedIn Profile
                    </a>
                </ContactItem>
            </ul>
        </div>
    );
};

export { Contacts };
