import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import facade from './api.facade';
import env from './env.config';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const body = req.rawBody;
    const parsedBody = JSON.parse(body);
    const userName = parsedBody.username;
    const password = parsedBody.password;

    await facade().invoke(userName, password, {
        host: `${env.host}`,
        port: `${env.port}`,
        path: `${env.pathToken}`,
        method: 'POST',
        headers: {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Authorization' : `Basic ${env.authBasic64}`
        },
      }).then((resData) => {
        console.log('RETURN FUNCTION RESPONSE!!!');
        console.log(`${JSON.stringify(resData)}`);

        context.res = {
          // status: 200, /* Defaults to 200 */
          body: JSON.stringify(resData)
      };
    });

};

export default httpTrigger;