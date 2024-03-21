type CurrencySymbols = Record<string, string>;

const currencySymbols: CurrencySymbols = {
    usd: '$',
    eur: '€',
    gbp: '£',
};

function getCurrencySymbol(currencyCode: string): string {
    return currencySymbols[currencyCode] || currencyCode;
}

export { getCurrencySymbol };
