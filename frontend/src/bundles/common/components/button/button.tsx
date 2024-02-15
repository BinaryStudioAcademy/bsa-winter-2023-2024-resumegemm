import { type FC, type ReactNode } from 'react';

type Properties = {
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
    children: ReactNode;
};

const Button: FC<Properties> = ({
    type = 'button',
    onClick,
    className,
    children,
}) => (
    <button className={className} onClick={onClick} type={type}>
        {children}
    </button>
);

export { Button };