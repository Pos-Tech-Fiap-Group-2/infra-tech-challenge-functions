import { request, RequestOptions } from 'http';
import ApiService from './api.interface';


class KeycloakApiService implements ApiService {

    async invoke(token: string, options: RequestOptions): Promise<any> {
            return new Promise((resolve, reject) => {
                let r = request(
                        options,
                        function (response) {
                            const { statusCode } = response;

                            console.log(statusCode);
                            
                            if (statusCode >= 300) {
                                console.log('entrou no IF');
                                reject(new Error(response.statusCode.toString()));
                            }

                            const chunks = [];
                            response.on('data', (chunk) => {
                                chunks.push(chunk);
                            });
                            
                            response.on('end', () => {
                                const result = Buffer.concat(chunks).toString();
                                let length: Number = result.length;

                                if (parseInt(length.toString(), 10) > 0) {
                                    resolve(JSON.parse(result));    
                                } else {
                                    reject(new Error(response.statusCode.toString()));
                                }
                            });
                        }
                    );

                    r.end();
                })
    }
}

export default new KeycloakApiService();