declare module '*.svg' {
    import { type React } from 'react';

    const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >;

    export { ReactComponent };
    const source: string;

    export { src };
}
