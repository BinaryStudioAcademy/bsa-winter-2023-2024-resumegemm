import { type IPaymentMethodRepository } from '../stripe-events/interfaces/interfaces';
import { type PaymentMethodModel } from './payment-method.model.js';
import { type PaymentMethod, type PaymentMethodCreate } from './types/types.js';

class PaymentMethodRepository implements IPaymentMethodRepository {
    private paymentMethodModel: typeof PaymentMethodModel;

    public constructor(paymentMethodModel: typeof PaymentMethodModel) {
        this.paymentMethodModel = paymentMethodModel;
    }

    public async find(id: string): Promise<PaymentMethod | undefined> {
        return await this.paymentMethodModel.query().findById(id);
    }

    public async create(data: PaymentMethodCreate): Promise<PaymentMethod> {
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
