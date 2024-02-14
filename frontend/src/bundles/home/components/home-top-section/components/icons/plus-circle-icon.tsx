type Properties = {
    className?: string;
};

const PlusCircleIcon: React.FC<Properties> = ({ className }: Properties) => {
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <circle cx="13" cy="13" r="13" fill="#DBAF2D" />
            <path
                d="M18.8432 14.592L13.9953 14.5574L13.9515 19.5252L11.4075 19.5071L11.4514 14.5393L6.60352 14.5048L6.62386 12.2008L11.4717 12.2354L11.5156 7.26758L14.0595 7.2857L14.0157 12.2535L18.8636 12.288L18.8432 14.592Z"
                fill="#F9F9F9"
            />
        </svg>
    );
};

export { PlusCircleIcon };