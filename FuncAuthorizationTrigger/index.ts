import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import facade from './api.facade';
import env from './env.config';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const auth_token = req.headers['x-auth-token'];

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
        context.log('RETURN FUNCTION RESPONSE!!!');
        context.log(`${JSON.stringify(resData)}`);

        context.res = {
          // status: 200, /* Defaults to 200 */
          body: JSON.stringify(resData)
      };
    });
};

export default httpTrigger;