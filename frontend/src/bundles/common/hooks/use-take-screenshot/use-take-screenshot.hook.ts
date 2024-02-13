import html2canvas from 'html2canvas';
import { type MutableRefObject, useState } from 'react';

type Parameters = {
    type: 'image/png' | 'image/jpeg';
    ref: MutableRefObject<HTMLElement | null>;
};

type ReturnValue = {
    screenshot: string | null;
    error: string | null;
    loading: boolean;
    takeScreenshot: ({ ref, type }: Parameters) => void;
};

const useTakeScreenShot = (): ReturnValue => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const takeScreenshot = ({ ref, type }: Parameters): void => {
        if (ref.current) {
            setLoading(true);
            const canvasPromise = html2canvas(ref.current, {
                useCORS: true,
            });
            canvasPromise
                .then((canvas) => {
                    const data = canvas.toDataURL(type);
                    setScreenshot(data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                    setLoading(false);
                });
        } else {
            setError('ref shouldn\'t be null');
        }
    };

    return {
        screenshot,
        error,
        loading,
        takeScreenshot,
    };
};

export { useTakeScreenShot };
