import type { AuthRequest, AuthResponse } from "../features/auth/auth.types";
import type { ApiResponse } from "./utils/ApiResponse";

const listAuth: AuthResponse[] = [
    {
        username: 'admin',
        role: 'ROLE_ADMIN',
        email: 'admin@gmail.com',
        password: '123456'
    },
    {
        username: 'quan',
        role: 'ROLE_USER',
        email: 'quan@gmail.com',
        password: '123456'
    }

]
export const login = async (authRegister: AuthRequest) => {
    const data: AuthResponse | undefined = listAuth.find((value) => value.email == authRegister.email && value.password == authRegister.password);
    if (data) {
        const res: ApiResponse<AuthResponse> = {
            code: 200,
            message: "Login Successfuly",
            data: data
        }
        return res
    }
}
export const registerUser = async (authResponse: AuthResponse) => {
    const existingUser = listAuth.find(e => e.email === authResponse.email);
    if (existingUser) {
        throw new Error("Email already exists");
    }
    const authPush = listAuth.push(authResponse);
    if (authPush) {
        const res: ApiResponse<AuthResponse> = {
            code: 201,
            message: "Register Successfuly",
            data: authResponse
        }
        return res
    }


}