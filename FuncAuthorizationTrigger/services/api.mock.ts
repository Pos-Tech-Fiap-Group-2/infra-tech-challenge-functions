import { request, RequestOptions } from 'http';
import ApiService from './api.interface';

class KeycloakApiMock implements ApiService {
    async invoke(token: string, options: RequestOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            let error = false;
            if (error) {
                reject(new Error('Error mock'));
            }

            const result = '{"sub": "87b9d6c4-320c-48ee-b8ea-c11ca4ae4f58","email_verified": false,"name": "Teste Incl CPF Last name MOCK","preferred_username": "11122233344","given_name": "Teste Incl CPF MOCK","family_name": "Last name MOCK"}';
            resolve(JSON.parse(result));
        })
    }
}

export default new KeycloakApiMock();