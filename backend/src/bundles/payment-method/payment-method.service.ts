import { type PaymentMethodRepository } from './payment-method.repository';
import {
    type IPaymentMethodService,
    type PaymentMethod,
    type PaymentMethodCreateDto,
} from './types/types';

class PaymentMethodService implements IPaymentMethodService {
    private paymentMethodRepository: PaymentMethodRepository;

    public constructor(paymentMethodRepository: PaymentMethodRepository) {
        this.paymentMethodRepository = paymentMethodRepository;
    }

    public async getById(id: string): Promise<PaymentMethod | null> {
        const paymentMethod = await this.paymentMethodRepository.find(id);

        return paymentMethod ?? null;
    }

    public async create(data: PaymentMethodCreateDto): Promise<PaymentMethod> {
        return await this.paymentMethodRepository.create(data);
    }

    public async delete(id: string): Promise<boolean> {
        return await this.paymentMethodRepository.delete(id);
    }
}

export { PaymentMethodService };
