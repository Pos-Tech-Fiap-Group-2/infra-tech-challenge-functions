import { request, RequestOptions } from 'http';
import env from '../env.config';
import ApiService from './api.interface';


class KeycloakApiService implements ApiService {

    async invoke(userName: string, password: string, options: RequestOptions): Promise<any> {
            return new Promise((resolve, reject) => {
                let r = request(
                        options,
                        function (response) {
                            const { statusCode } = response;
                            
                            if (statusCode >= 300) {
                                reject(new Error(response.statusCode.toString()));
                            }

                            const chunks = [];
                            response.on('data', (chunk) => {
                                chunks.push(chunk);
                            });
                            
                            response.on('end', () => {
                                const result = Buffer.concat(chunks).toString();
                                let { statusCode } = response;
                                
                                if (statusCode >= 300) {
                                    console.log(`Caiu IF error...`);
                                    reject(new Error(response.statusCode.toString()));
                                } else {
                                    resolve(JSON.parse(result));
                                }
                            });
                        }
                    );

                    r.write(`grant_type=password&username=${userName}&password=${password}&client_secret=${env.authClientSecret}`);
                    r.end();
                })
    }
}

export default new KeycloakApiService();