type GetPriceResponseDto = {
    id: string,
    currency: string,
    interval?: string,
    unit_amount: number | null,
    product: {
        images: string[],
        name: string,
        description: string | null
    }
};

export { type GetPriceResponseDto };
