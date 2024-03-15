import { type PaymentMethod, type PaymentMethodCreate } from '../types/types';

interface IPaymentMethodRepository {
    find(id: string): Promise<PaymentMethod | undefined>;
    create(data: PaymentMethodCreate): Promise<PaymentMethod>;
    delete(id: string): Promise<boolean>;
}

export { type IPaymentMethodRepository };
