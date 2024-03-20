import { type OrderByDirection } from 'objection';

type FindAllOptions = {
    direction?: OrderByDirection;
    name?: string;
};

export { type FindAllOptions };
