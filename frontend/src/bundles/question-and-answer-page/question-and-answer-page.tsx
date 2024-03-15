import { QuestionAndAnswer } from './components/question-and-answer/question-and-answer';
import styles from './styles.module.scss';

const QuestionAndAnswerPage: React.FC = () => {
    return (
        <div className={styles.qa_page__container}>
            <QuestionAndAnswer />
        </div>
    );
};

export { QuestionAndAnswerPage };
