import { test, expect } from '@playwright/test';
import { loginWithusername } from '../../supports/command';
import { getMemberInfo}  from '../member/func'

let tokens

test.describe('Test Staffapp', () => {
  test.beforeEach('get token', async () => {
    const result = await loginWithusername('10000','test123123','staff-app-dev','R8iyPpnZMCej9HrrkRrJ0Wdy4g7x279Z')
    tokens = result
  });

  test('Get Customer Info', async () => {
    await getMemberInfo('2009113',tokens)
    console.log('Pass')

  })

  }); 