type GetPriceResponseDto = {
    id: string;
    currency: string;
    recurring: {
        interval?: string;
        interval_count?: number;
    };
    unit_amount: number | null;
    product: {
        images: string[];
        name: string;
        description: string | null;
    };
};

export { type GetPriceResponseDto };
