export interface ArtistDataDto {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

//TODO map Dto to Class

export interface ExternalUrls {
    spotify: string;
}

export interface Followers {
    href: string | null;
    total: number;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}
