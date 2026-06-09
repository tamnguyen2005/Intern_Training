import { email } from 'zod';
export interface LoginRequest{
    email!:string;
    password!:string;
}
export interface RegisterRequest{
    fullName!:string;
    email!:string;
    phoneNumber!:string;
    password!:string;
}
export interface LoginResponse{
    accessToken!:string;
}
export interface JwtPayload{
    sub:number;
    email:string;
    name:string;
}