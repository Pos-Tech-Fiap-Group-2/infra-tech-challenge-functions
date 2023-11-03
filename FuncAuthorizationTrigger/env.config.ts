import * as dotenv from 'dotenv';

(function() {
    dotenv.config();
})();

export default {
    host: process.env.KEYCLOAK_HOST,
    port: process.env.KEYCLOAK_PORT,
    pathToken: process.env.KEYCLOAK_PATH_OPENID,
    serviceMock: process.env.SERVICE_MOCK
}