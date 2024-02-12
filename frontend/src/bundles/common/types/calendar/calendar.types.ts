type CalendarDate = {
    present: boolean;
    month: CalendarMonth | null;
    year: number | null;
};

type CalendarMonth = {
    name: string;
    num: number;
};

export { type CalendarDate, type CalendarMonth };
