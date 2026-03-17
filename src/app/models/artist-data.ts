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

export class ArtistData {
    constructor(
        public externalUrls: ExternalUrls,
        public followers: Followers,
        public genres: string[],
        public href: string,
        public id: string,
        public images: Image[],
        public name: string,
        public popularity: number,
        public type: string,
        public uri: string,
    ) {}

    static fromDto(dto: ArtistDataDto): ArtistData {
        return new ArtistData(
            dto.external_urls,
            dto.followers,
            dto.genres,
            dto.href,
            dto.id,
            dto.images,
            dto.name,
            dto.popularity,
            dto.type,
            dto.uri,
        );
    }
}

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
