
export interface ApiErrorDto {
    errors: string[];
    message: string;
}

export interface ApiErrorMessageDto {
    code: string;
    text: string;
}

export interface JWTokenDto extends Serializable {
    refreshToken: string;
    token: string;
}

export interface LoginDto extends Serializable {
    password: string;
    username: string;
}

export interface Serializable {
}
