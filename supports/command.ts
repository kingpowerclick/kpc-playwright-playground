import { HttpMethod } from '../utils/http-method.ts'
import { IncomingHttpHeaders, request } from 'http'
import axios from 'axios';

export interface HttpRequestHeader extends IncomingHttpHeaders {}


export const defaultHeaders: HttpRequestHeader = {
    'content-type': 'application/x-www-form-urlencoded',
}

export async function loginWithusername(username: string, password: string, clientId: string, clientSecret: string,) {
        username = username === '' ? '10000' : username
        password = password === '' ? 'test123123' : password
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);
        params.append('username', username);
        params.append('password', password);

        const response = await axios.post('https://iam.kingpower.com/realms/dev-staff-app/protocol/openid-connect/token',
            params.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        const accessToken  = response.data.access_token;
        const tokenType = response.data.token_type;

    return {
        token: `${tokenType} ${accessToken}`,
    }
}
