import { HttpApi } from '~/framework/api/http-api';
import { type IHttp } from '~/framework/http/http';
import { type IStorage } from '~/framework/storage/storage';

import { ApiPath, ContentType } from '../common/enums/enums';
import { EmailSubscriptionsApiPath } from './enums/enums';
import { type EmailSubscription } from './types/types';

type Constructor = {
    baseUrl: string;
    http: IHttp;
    storage: IStorage;
};

class EmailSubscriptionsApi extends HttpApi {
    public constructor({ baseUrl, http, storage }: Constructor) {
        super({ path: ApiPath.EMAIL_SUBSCRIPTIONS, baseUrl, http, storage });
    }

    public async subscribe(): Promise<EmailSubscription> {
        const response = await this.load(
            this.getFullEndpoint(EmailSubscriptionsApiPath.SUBSCRIBE, {}),
            {
                method: 'POST',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );
        return await response.json<EmailSubscription>();
    }

    public async unsubscribe(id: string): Promise<{ message: string }> {
        const response = await this.load(
            this.getFullEndpoint(EmailSubscriptionsApiPath.UNSUBSCRIBE, { id }),
            {
                method: 'DELETE',
                contentType: ContentType.JSON,
                hasAuth: true,
                payload: JSON.stringify({}),
            },
        );
        return await response.json<{ message: string }>();
    }
}

export { EmailSubscriptionsApi };
