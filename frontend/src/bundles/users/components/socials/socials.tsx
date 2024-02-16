import { BaseButton } from '~/bundles/common/components/components';

import styles from './style.module.scss';

const Socials: React.FC = () => {
    return (
        <div className={styles.socials}>
            <div className={styles.socials__item}>
                <div className={styles.socials__item__name}>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#3B5998"
                                d="M9.73 6.486v2.478H8v3.03h1.73l.013 8.506h3.552l-.014-8.505h2.384s.223-1.453.331-3.042h-2.701V6.881c0-.31.387-.726.77-.726H16V3h-2.631c-3.728 0-3.64 3.033-3.64 3.486z">
                            </path>
                        </svg>
                    </div>
                    <p>Facebook</p>
                </div>
                <div>
                    <BaseButton>Connect</BaseButton>
                </div>
            </div>
            <div className={styles.socials__item}>
                <div className={styles.socials__item__name}>
                    <div>
                        <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill="#0077B5"
                                d="M7.86 7.704V18.5H4.214V7.704H7.86zm.24-3.34c0 1.037-.792 1.867-2.063 1.867h-.023C4.791 6.23 4 5.4 4 4.365 4 3.306 4.815 2.5 6.061 2.5c1.247 0 2.015.806 2.038 1.865zM21 12.31v6.19h-3.644v-5.776c0-1.45-.527-2.44-1.846-2.44-1.007 0-1.606.667-1.87 1.311-.096.231-.12.553-.12.876V18.5H9.876s.048-9.783 0-10.796h3.644v1.53c.484-.735 1.35-1.783 3.285-1.783C19.202 7.45 21 8.994 21 12.31z">
                            </path>
                        </svg>
                    </div>
                    <p>LinkedIn</p>
                </div>
                <div>
                    <BaseButton>Connect</BaseButton>
                </div>
            </div>
            <div className={styles.socials__item}>
                <div className={styles.socials__item__name}>
                    <div>
                    <svg width="24" height="24" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <path
                                d="M19 12.3058C19 11.8203 18.9606 11.3322 18.8767 10.8546L12.1404 10.8546V13.6048H15.9979C15.8379 14.4917 15.3235 15.2764 14.5704 15.775V17.5594H16.8718C18.2232 16.3155 19 14.4786 19 12.3058Z"
                                fill="#4285F4">
                            </path>
                            <path
                                d="M12.1404 19.2833C14.0665 19.2833 15.6909 18.6509 16.8744 17.5592L14.573 15.7748C13.9327 16.2104 13.1061 16.4571 12.143 16.4571C10.2798 16.4571 8.70009 15.2001 8.13327 13.5101H5.75839V15.3497C6.97076 17.7613 9.44011 19.2833 12.1404 19.2833Z"
                                fill="#34A853">
                            </path>
                            <path
                                d="M8.13065 13.5102C7.83149 12.6233 7.83149 11.6628 8.13065 10.7758V8.93628H5.75839C4.74545 10.9543 4.74545 13.3318 5.75839 15.3498L8.13065 13.5102Z"
                                fill="#FBBC04">
                            </path>
                            <path
                                d="M12.1404 7.82623C13.1586 7.81049 14.1426 8.19362 14.88 8.8969L16.919 6.85791C15.6279 5.64554 13.9143 4.979 12.1404 4.99999C9.44011 4.99999 6.97076 6.52202 5.75839 8.93626L8.13065 10.7758C8.69485 9.08322 10.2772 7.82623 12.1404 7.82623Z"
                                fill="#EA4335">
                            </path>
                        </g>
                    </svg>
                    </div>
                    <p>Google</p>
                </div>
                <div>
                    <BaseButton>Connect</BaseButton>
                </div>
            </div>
        </div>
    );
};

export { Socials };
