export interface AuthResponse {
    password: string,
    username: string,
    email: string,
    role: string
}

export interface AuthRequest {
    password: string,
    email:string
}