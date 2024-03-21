import html2canvas from 'html2canvas';
import { type Options } from 'html2canvas';
import { type MutableRefObject, useState } from 'react';

type Convert = {
    type: 'image/png' | 'image/jpeg';
    quality: number;
};

type Parameters = {
    ref: MutableRefObject<HTMLElement | null>;
    convertOptions: Convert;
    options?: Partial<Options>;
};

type ReturnValue = {
    screenshot: string | null;
    error: string | null;
    loading: boolean;
    takeScreenshot: ({
        ref,
        convertOptions,
        options,
    }: Parameters) => Promise<string | null>;
};

const useTakeScreenShot = (): ReturnValue => {
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const takeScreenshot = async ({
        ref,
        convertOptions: { type, quality },
        options,
    }: Parameters): Promise<string | null> => {
        try {
            if (!ref.current) {
                throw new Error('Reference is required');
            }
            setLoading(true);
            const canvas = await html2canvas(ref.current, {
                ...options,
                allowTaint: true,
            });
            const data = canvas.toDataURL(type, quality);
            setScreenshot(data);

            return data;
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }

        return screenshot;
    };

    return {
        screenshot,
        error,
        loading,
        takeScreenshot,
    };
};

export { useTakeScreenShot };
