import { type PaymentMethod, type PaymentMethodCreate } from '../types/types';

interface IPaymentMethodService {
    getById(id: string): Promise<PaymentMethod | null>;
    create(data: PaymentMethodCreate): Promise<PaymentMethod>;
    delete(id: string): Promise<boolean>;
}

export { type IPaymentMethodService };
