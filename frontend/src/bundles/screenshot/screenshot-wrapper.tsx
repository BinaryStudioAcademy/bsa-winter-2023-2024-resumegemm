/* eslint-disable react/jsx-no-bind */

import { type ReactNode, useEffect, useRef } from 'react';

import { useTakeScreenShot } from '../common/hooks/use-take-screenshot/use-take-screenshot.hook';

type Properties = {
    children: ReactNode;
};

const ScreenshotWrapper = ({ children }: Properties): JSX.Element => {
    const captureReference = useRef<HTMLDivElement | null>(null);
    const { screenshot, loading, error, takeScreenshot } = useTakeScreenShot();

    useEffect(() => {
        if (screenshot && !loading) {
            // do something with screenshot variable
        }
    }, [loading, screenshot]);

    const handleTakeScreenshot = (): void => {
        takeScreenshot({ ref: captureReference, type: 'image/png' });
    };

    return (
        <>
            <div ref={captureReference}>{children}</div>
            <button onClick={handleTakeScreenshot}>Download</button>
            <div style={{ backgroundColor: 'red', height: '200px' }}>
                {screenshot && <img src={screenshot} alt="Screensot" />}
            </div>
        </>
    );
};

export { ScreenshotWrapper };
