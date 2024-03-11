type PaymentMethodCreate = {
    userId: string;
    paymentMethodId: string;
    card: string;
    cardExpireDate: Date;
};

export { type PaymentMethodCreate };
