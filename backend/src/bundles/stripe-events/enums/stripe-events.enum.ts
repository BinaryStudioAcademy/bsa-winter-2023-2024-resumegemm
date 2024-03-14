enum StripeEvents {
    SUBSCRIPTION_CREATED = 'customer.subscription.created',
    PLAN_CREATED = 'plan.created',
    PLAN_DELETED = 'plan.deleted',
    PLAN_UPDATED = 'plan.updated',
    PRICE_CREATED = 'price.created',
    PRICE_DELETED = 'price.deleted',
    PRICE_UPDATED = 'price.updated',
    PRODUCT_CREATED = 'product.created',
    PRODUCT_DELETED = 'product.deleted',
    PRODUCT_UPDATED = 'product.updated',
}

export { StripeEvents };
