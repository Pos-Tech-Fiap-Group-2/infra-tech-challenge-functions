import env from './env.config';
import ApiInterface from './services/api.interface';
import ApiMock from './services/api.mock';
import KeycloakApiService from './services/api.service';

const parseBoolean = (value: string) : boolean => {
    let truthy: string[] = ['true','1'];
    return truthy.includes(value?.toLowerCase() ?? '');
}

export default function api(): ApiInterface {
    if (parseBoolean(env.serviceMock)) {
        return ApiMock;
    }

    return KeycloakApiService;
};
