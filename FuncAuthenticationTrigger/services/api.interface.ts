import { request, RequestOptions } from 'http';

export default interface ApiService {
    invoke(userName: string, password: string, options: RequestOptions) : Promise<any>;
}