export interface SpotifyTokenDto {
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    scope: string;
    token_type: string;
}

export class SpotifyToken {
    constructor(
        public accessToken: string,
        public expiresIn: number,
        public refreshToken: string | undefined,
        public scope: string,
        public tokenType: string,
    ) {}

    static fromDto(dto: SpotifyTokenDto): SpotifyToken {
        return new SpotifyToken(
            dto.access_token,
            dto.expires_in,
            dto.refresh_token,
            dto.scope,
            dto.token_type,
        );
    }
}
