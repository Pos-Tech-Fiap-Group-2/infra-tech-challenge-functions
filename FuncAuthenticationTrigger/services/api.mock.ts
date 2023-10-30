import { request, RequestOptions } from 'http';
import ApiService from './api.interface';

class KeycloakApiMock implements ApiService {
    async invoke(userName: string, password: string, options: RequestOptions): Promise<any> {
        return new Promise((resolve, reject) => {
            let error = false;
            if (error) {
                reject(new Error('Error mock'));
            }

            const result = '{"access_token":"dsakjdkas.jidaosjdsa.ioudsaod","expires_in":60,"refresh_expires_in":1800,"refresh_token":"dasjdjsag.dasuidysai.rewkrjhewk","token_type":"Bearer","not-before-policy":0,"session_state":"af17aab3-2d26-4929-bb0c-cc5d39c5a356","scope":"email openid profile MOCK"}';
            resolve(JSON.parse(result));
        })
    }
}

export default new KeycloakApiMock();