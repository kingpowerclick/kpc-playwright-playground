import { expect } from '@playwright/test';
import axios from 'axios';

export async function getMemberInfo(params: any,token: any) {
    console.log(token)
    const response = await axios.get(`https://dev-api-staff.innovate.theable.dev/customers/members/${params}`, {
    headers: {
        'Authorization': `${token}`
    }
});
    expect(response.status).toBe(200)
} 