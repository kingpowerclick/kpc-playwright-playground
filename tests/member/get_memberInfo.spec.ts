import { test, expect, type Page } from '@playwright/test';
import { HttpRequestHeader, loginWithusername } from '../../supports/command';
import { getMemberInfo}  from './func';
import { resource } from './data';
const env = require('../../playwright.env.json');

test.describe('Test Staffapp', () => {
  let tokens
  let headers: HttpRequestHeader;
  
  test.beforeEach('get token', async () => {
    const clientSecret = env.clientSecret;
    const clientId = env.clientId;
    const result = await loginWithusername('','',`${clientId}`,`${clientSecret}`)
    tokens = result.token
    headers = { Authorization: tokens }
    console.log(headers)
  });

  test('Get Customer Info', async () => {
    const member = resource.members
    const res = await getMemberInfo(member.memberId,tokens)
    console.log(res.data)

  })
  }); 