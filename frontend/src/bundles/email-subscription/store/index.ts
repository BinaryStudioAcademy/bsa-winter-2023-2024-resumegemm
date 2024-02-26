import { subscribe, unsubscribe } from './actions';
import { actions } from './slice';

const allActions = {
    ...actions,
    subscribe,
    unsubscribe,
};

export { allActions as actions };
export { reducer } from './slice';
