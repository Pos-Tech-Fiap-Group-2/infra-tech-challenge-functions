import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import facade from './api.facade';
import env from './env.config';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const auth_token = req.headers['x-auth-token'];

    // Alteração para teste de pipeline.

    await facade().invoke(auth_token, {
        host: `${env.host}`,
        port: `${env.port}`,
        path: `${env.pathToken}`,
        method: 'GET',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${auth_token}`
        },
      }).then((resData) => {
        context.res = {
          // status: 200, /* Defaults to 200 */
          body: JSON.stringify(resData)
        };
      }).catch((error) => {
        context.res = {
          headers: {
            'Content-Type': 'application/json'
          },
          status: error.message,
          isRaw: true,
        };
    });
};

export default httpTrigger;