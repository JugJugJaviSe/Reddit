import axios from "axios";
import type { IAuthAPIService } from "./IAuthAPIService";
import type { AuthResponse } from "../../types/auth/AuthResponse";

const API_URL: string = import.meta.env.VITE_API_URL + "auth";

export const authApi: IAuthAPIService = {

    async login(username: string, password: string): Promise<AuthResponse>{
        try{
            const res = await axios.post<AuthResponse>(`${API_URL}/login`, {username, password});
            return res.data;
        }catch(error){
            let message: string = "Login error";
            if(axios.isAxiosError(error)){
                message = error.response?.data.message || message;
            }

            return{ success: false, message: message, data: undefined};
        }
    },

    async register(username: string, password: string, fullName: string, role: string): Promise<AuthResponse>{
        try{
            const res = await axios.post<AuthResponse>(`${API_URL}/register`, {
                username, password, fullName, role
            });
            return res.data;
        }catch(error){
            let message: string = "Register error";
            if(axios.isAxiosError(error)){
                message = error.response?.data.message || message;
            }

            return {success: false, message: message, data: undefined};
        }
    }
}