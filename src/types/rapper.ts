export interface Rapper {
    id: string;
    name: string;
    region: string;
    tags: string[];
    bio: string;
    discography: string[];
    social: {
        youtube?: string;
        instagram?: string;
        twitter?: string;
    };
    image?: string;
}
