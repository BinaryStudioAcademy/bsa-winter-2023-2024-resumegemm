import 'react-quill/dist/quill.snow.css';

import { type FC, useCallback, useState } from 'react';
import ReactQuill from 'react-quill';

import styles from './styles.module.scss';

type Properties = {
    initialText?: string;
    onChange?: (value: string) => void;
};

const TextEditor: FC<Properties> = ({ initialText, onChange }) => {
    const [text, setText] = useState<string>(initialText ?? '');

    const handleEditorTextChange = useCallback(
        (text: string): void => {
            setText(text);
            if (onChange) {
                onChange(text);
            }
        },
        [onChange],
    );

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
        ],
    };

    return (
        <div className={styles.textEditor}>
            <ReactQuill
                theme="snow"
                modules={modules}
                value={text}
                onChange={handleEditorTextChange}
            />
        </div>
    );
};

export { TextEditor };
