import { request, RequestOptions } from 'http';

export default interface ApiService {
    invoke(token: string, options: RequestOptions) : Promise<any>;
}