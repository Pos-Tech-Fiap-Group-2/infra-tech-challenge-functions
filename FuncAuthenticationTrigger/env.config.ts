import * as dotenv from 'dotenv';

(function() {
    dotenv.config();
})();

export default {
    host: process.env.KEYCLOAK_HOST,
    port: process.env.KEYCLOAK_PORT,
    pathToken: process.env.KEYCLOAK_PATH_TOKEN,
    authBasic64: process.env.KEYCLOACK_AHT_BASIC64,
    authClientSecret: process.env.KEYCLOAK_AUTH_CLIENT_SECRET,
    serviceMock: process.env.SERVICE_MOCK
}