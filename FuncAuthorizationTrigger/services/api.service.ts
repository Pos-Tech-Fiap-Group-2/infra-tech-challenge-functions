import { request, RequestOptions } from 'http';
import ApiService from './api.interface';


class KeycloakApiService implements ApiService {

    async invoke(token: string, options: RequestOptions): Promise<any> {
            return new Promise((resolve, reject) => {
                let r = request(
                        options,
                        function (response) {
                            const { statusCode } = response;
                            
                            if (statusCode >= 300) {
                                reject(new Error(response.statusMessage));
                            }

                            const chunks = [];
                            response.on('data', (chunk) => {
                                chunks.push(chunk);
                            });
                            
                            response.on('end', () => {
                                const result = Buffer.concat(chunks).toString();
                                resolve(JSON.parse(result));
                            });
                        }
                    );

                    r.end();
                })
    }
}

export default new KeycloakApiService();