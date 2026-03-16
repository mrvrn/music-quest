export interface SpotifyTokenDto {
    access_token: string;
    token_type: string;
    expires_in: number;
}

export class SpotifyToken {
    constructor(
        public accessToken: string,
        public tokenType: string,
        public expiresIn: number,
    ) {}

    static fromDto(dto: SpotifyTokenDto): SpotifyToken {
        return new SpotifyToken(dto.access_token, dto.token_type, dto.expires_in);
    }
}
