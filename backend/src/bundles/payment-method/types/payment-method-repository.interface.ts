import {
    type PaymentMethod,
    type PaymentMethodCreateDto,
} from '../types/types';

interface IPaymentMethodRepository {
    find(id: string): Promise<PaymentMethod | undefined>;
    create(data: PaymentMethodCreateDto): Promise<PaymentMethod>;
    delete(id: string): Promise<boolean>;
}

export { type IPaymentMethodRepository };
