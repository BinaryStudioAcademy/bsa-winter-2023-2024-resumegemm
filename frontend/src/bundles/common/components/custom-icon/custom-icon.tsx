import React from 'react';

const iconMap: Record<string, JSX.Element> = {
    delete: (
        <path
            d="M8,19 L16,19 L16,13 L8,13 L8,19 Z M16,7 L20,7 L20,9 L4,9 L4,7 L8,7
            L8,3 L16,3 L16,7 Z M14,7 L14,5 L10,5 L10,7 L14,7 Z M6,11 L18,11 L18,21
            L6,21 L6,11 Z"
        />
    ),
};

type CustomIconProperties = {
    name: string;
    color?: string;
    size?: string;
    className?: string;
};

const CustomIcon: React.FC<CustomIconProperties> = ({
    name,
    color,
    size,
    className,
    ...rest
}) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            fill={color}
            className={className}
            {...rest}
        >
            {iconMap[name]}
        </svg>
    );
};

export { CustomIcon };
