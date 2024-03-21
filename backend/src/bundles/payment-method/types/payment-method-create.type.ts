type PaymentMethodCreate = {
    userId: string;
    paymentMethodId: string;
    card: string;
    expireDate: Date;
};

export { type PaymentMethodCreate };
