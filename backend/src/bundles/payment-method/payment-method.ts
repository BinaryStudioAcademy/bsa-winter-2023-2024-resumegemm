import { PaymentMethodModel } from './payment-method.model.js';
import { PaymentMethodRepository } from './payment-method.repository.js';
import { PaymentMethodService } from './payment-method.service.js';

const paymentMethodRepository = new PaymentMethodRepository(PaymentMethodModel);

const paymentMethodService = new PaymentMethodService(paymentMethodRepository);

export { type PaymentMethod, type PaymentMethodCreate } from './types/types.js';
export { paymentMethodRepository, paymentMethodService };
