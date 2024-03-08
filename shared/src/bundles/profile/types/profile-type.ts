type Profile = {
    id: string;
    firstName: string;
    lastName: string | null;
    avatar?: string | null;
    createdAt: string;
    updatedAt: string;
};

export { type Profile };
