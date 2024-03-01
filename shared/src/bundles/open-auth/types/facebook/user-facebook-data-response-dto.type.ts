type UserFacebookDataResponseDto = {
    id: string;
    email: string;
    name: string;
    last_name: string;
    picture: {
        data: {
            url: string;
        };
    };
};

export { type UserFacebookDataResponseDto };
