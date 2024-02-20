type FileProperties = {
    id: string | null;
    url: string;
};

class FileEntity {
    private 'id': string | null;

    private 'url': string;

    private constructor({ id, url }: FileProperties) {
        this.id = id;
        this.url = url;
    }

    public static initialize({ id, url }: FileProperties): FileEntity {
        return new FileEntity({
            id,
            url,
        });
    }

    public static initializeNew({ url }: { url: string }): FileEntity {
        return new FileEntity({
            id: null,
            url,
        });
    }

    public toObject(): {
        id: string;
        url: string;
    } {
        return {
            id: this.id as string,
            url: this.url,
        };
    }

    public toNewObject(): {
        url: string;
    } {
        return {
            url: this.url,
        };
    }
}

export { FileEntity };
