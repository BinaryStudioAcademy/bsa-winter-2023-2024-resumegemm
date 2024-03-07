type UserLinkedInDataResponseDto = {
    id: string;
    emailAddress: string;
    localizedFirstName: string;
    localizedLastName: string;
    profilePicture: {
        displayImage: {
            identifiers: {
                identifier: string;
            }[];
        };
    };
};

export { type UserLinkedInDataResponseDto };
