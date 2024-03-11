import {
    type PaymentMethod,
    type PaymentMethodCreateDto,
} from '../types/types';

interface IPaymentMethodService {
    getById(id: string): Promise<PaymentMethod | null>;
    create(data: PaymentMethodCreateDto): Promise<PaymentMethod>;
    delete(id: string): Promise<boolean>;
}

export { type IPaymentMethodService };
