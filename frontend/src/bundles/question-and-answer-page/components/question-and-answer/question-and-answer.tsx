import { QuestionAndAnswerItem } from '../question-and-answer-item/question-and-answer-item';
import styles from './styles.module.scss';

const QuestionAndAnswer: React.FC = () => {
    return (
        <div className={styles.question_and_answer__container}>
            <h1 className={styles.question_and_answer__title}>Q&A</h1>
            <QuestionAndAnswerItem title="Why is ResumeGemm the best resume builder online?">
                <p>
                    ResumeGemm provides an intuitive and user-friendly
                    interface, ensuring that users can effortlessly create
                    professional resumes without the need for extensive
                    technical skills. The platform offers a wide range of
                    customization options, allowing users to tailor their
                    resumes to match their unique skills, experiences, and
                    career objectives. From various templates to customizable
                    sections, ResumeGemm ensures that each resume is
                    personalized to make a lasting impression. ResumeGemm stands
                    out as the best online resume builder due to its advanced AI
                    resume editor. The AI editor optimizes content, provides
                    real-time feedback, and adapts to industry trends, ensuring
                    your resume is not only visually appealing but also tailored
                    for success in the job market.
                </p>
            </QuestionAndAnswerItem>

            <QuestionAndAnswerItem title="What can I do with a premium subscription?">
                <p>
                    A premium account gives you full access to all of our site`s
                    premium features, including total access to our growing
                    selection of job-winning resume templates and cover letter
                    templates, the ability to download PDF and Word documents,
                    and more. In addition to our award winning resume templates,
                    we now offer 18 innovative and fresh cover letter templates
                    as well. See a list of the most useful features accessible
                    through a Premium Account below:
                </p>
            </QuestionAndAnswerItem>

            <QuestionAndAnswerItem title="Premium Subscription Features:">
                <ul>
                    <li>- Unlimited Resumes</li>
                    <li>- All Premium Templates</li>
                    <li>- Unlimited PDF Downloads</li>
                </ul>
            </QuestionAndAnswerItem>

            <QuestionAndAnswerItem title="How do I choose the right resume template?">
                <p>
                    Choosing the right resume template mostly comes down to
                    personal preference. Granted, if you’re applying for a job
                    in finance, you may not want an abstract-leaning format like
                    a graphic designer may use. So, as you browse through all
                    the resume templates while you build your resume, think
                    about what potential employers may expect to see, then pick
                    the resume that fits both your personality and career goals.
                </p>
            </QuestionAndAnswerItem>

            <QuestionAndAnswerItem title="Do I need a different resume for every different job application?">
                <p>
                    Every time you apply for a new job, you should make sure the
                    resume speaks directly to the job description. That means,
                    your resume may not need to be entirely different, but
                    you’ll likely want to make at least a few minor updates. If
                    you’re applying for a different type of job, you may want a
                    completely different resume, from the content all the way to
                    the format. With all the different templates to choose from,
                    take advantage of our resume builder and create a variety of
                    resumes to fit both your personality and your different job
                    applications.
                </p>
            </QuestionAndAnswerItem>
        </div>
    );
};

export { QuestionAndAnswer };
