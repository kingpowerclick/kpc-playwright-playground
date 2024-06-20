import { HttpMethod } from '../utils/http-method.ts'
import { IncomingHttpHeaders, request } from 'http'
import { combineURLs } from '../utils/url.ts'
import { test,expect,Page } from '@playwright/test';
const axios = require('axios');

export interface HttpRequestHeader extends IncomingHttpHeaders {}

export enum UserType {
    ADMIN = 'admin',
    USER = 'user',
}

export const defaultHeaders: HttpRequestHeader = {
    'content-type': 'application/json',
}

export const securityHeaders: HttpRequestHeader = {
    'content-type': 'application/json',
    'X-Device-Id': 'testqa',
    'Accept-Language': 'en',
    'Platform': 'web',
}


export async function graphql(graphql: string, headers: HttpRequestHeader = {}){

        const response = await axios.HttpMethod.POST('/', {
            body: {
                    query: graphql,
                },
                headers: {
                        ...defaultHeaders,
                        ...headers,
                    },
                encoding: 'utf-8',
        })

        return response
    }
