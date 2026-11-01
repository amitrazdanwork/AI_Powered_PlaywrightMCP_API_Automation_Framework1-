import { APIRequestContext, APIResponse } from "@playwright/test";
import { Routes } from "./routes";
import { TokenManager } from '../utils/TokenManager';

export class APIOperations {

    private request: APIRequestContext;

    constructor(request: APIRequestContext) { 
        this.request = request; 
    }

    // POST API
    async post(payload: any, headers?: Record<string, string>): Promise<APIResponse> {
        return await this.request.post(Routes.addPetToStore(), { 
            data: payload, 
            headers: { ...headers }
        });
    }

    // GET API
    async get(id: string | number | null, headers?: Record<string, string>): Promise<APIResponse> {
        if (id != null) {
            return await this.request.get(Routes.getPetByPetId(id), { 
                headers: { ...headers }
            });
        }else {
            console.log("❌ No ID provided for getting pet");
            return await this.request.get(Routes.addPetToStore(), { 
                headers: { ...headers }
            });
        }
    }
   
    // PUT API
    async put(id: string | number, payload: any, headers?: Record<string, string>): Promise<APIResponse | null> {
     //   const token = await TokenManager.generateNewToken();

        if (id != null) {
            return await this.request.put(Routes.updatePetById(id), {    
                headers: { 
                ...headers,
          //      'Cookie': `token=${token}`,
                'Content-Type': 'application/json' 
                }, 
                data: payload
            });
        } else {
            console.log("❌ No ID provided for updating pet");
            return null;
        }
    }

    // DELETE API - Removed 'url: string'
    async delete(id: string | number, headers?: Record<string, string>): Promise<APIResponse> {
       // const token = await TokenManager.generateNewToken();
       //  console.log(token);

        return await this.request.delete(Routes.deletePetById(id), {
            headers: { 
                ...headers,
                'api_key': `${process.env.API_KEY}`,
            }
        });
    }
}