import React, { type ReactNode } from 'react';

type TabItemProperties = {
    children: ReactNode;
    title: string;
};

const TabItem: React.FC<TabItemProperties> = ({ children }) => {
    return <div>{children}</div>;
};

export { TabItem };
