interface Tab {
    id: number;
    label: string;
    content: React.ReactNode;
  }
  
  interface TabsProperties {
    tabs: Tab[];
  }

  export { type TabsProperties as TabsProps };