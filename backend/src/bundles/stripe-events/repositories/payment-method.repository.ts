import {
    type PaymentMethod,
    type PaymentMethodCreateDto,
} from '~/bundles/stripe-events/types/types.js';

import { type IPaymentMethodRepository } from '../interfaces/interfaces';
import { type PaymentMethodModel } from '../models/models';

class PaymentMethodRepository implements IPaymentMethodRepository {
    private paymentMethodModel: typeof PaymentMethodModel;

    public constructor(paymentMethodModel: typeof PaymentMethodModel) {
        this.paymentMethodModel = paymentMethodModel;
    }

    public async find(id: string): Promise<PaymentMethod | undefined> {
        return await this.paymentMethodModel.query().findById(id);
    }

    public async create(data: PaymentMethodCreateDto): Promise<PaymentMethod> {
        return await this.paymentMethodModel
            .query()
            .insert(data)
            .returning('*');
    }

    public async delete(id: string): Promise<boolean> {
        const response = await this.paymentMethodModel.query().deleteById(id);

        return Boolean(response);
    }
}

export { PaymentMethodRepository };
