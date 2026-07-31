import { test, expect } from '@playwright/test'

const validAcc = {
    email: 'test178485699583497@web-library.net',
    password: '123456Aa'
};
test('Login with user not exist', async({page})=>{
    await page.goto('https://valentinos-magic-beans.click/login');
    await expect(page).toHaveURL('https://valentinos-magic-beans.click/login');

    const eleEmail = page.locator('[data-test-id="login-email-input"]');
    const elePassword = page.locator('[data-test-id="login-password-input"]');
    const eleBtnLogin = page.locator('[data-test-id="login-submit-button"]');
    const eleErrMsg = page.locator('li[role="status"] div.text-sm').filter({hasText: 'User does not exist.'});

    await eleEmail.fill('testtest@xyz.com');
    await elePassword.fill('123456');
    await eleBtnLogin.click();
    await expect(eleErrMsg).toBeVisible();
});
test('Login with valid account', async({page})=>{
    await page.goto('https://valentinos-magic-beans.click/login');
    await expect(page).toHaveURL('https://valentinos-magic-beans.click/login');

    const eleEmail = page.locator('[data-test-id="login-email-input"]');
    const elePassword = page.locator('[data-test-id="login-password-input"]');
    const eleBtnLogin = page.locator('[data-test-id="login-submit-button"]');
    const eleIconProfile = page.locator('button[aria-haspopup="menu"]');

    await eleEmail.fill(validAcc.email);
    await elePassword.fill(validAcc.password);
    await eleBtnLogin.click();
    await expect(eleIconProfile).toBeVisible();
});

test('Logout', async({page})=>{
    //Pre-condition: Login with valid account first
    await page.goto('https://valentinos-magic-beans.click/login');
    await expect(page).toHaveURL('https://valentinos-magic-beans.click/login');

    const eleEmail = page.locator('[data-test-id="login-email-input"]');
    const elePassword = page.locator('[data-test-id="login-password-input"]');
    const eleBtnLogin = page.locator('[data-test-id="login-submit-button"]');
    const eleIconProfile = page.locator('button[aria-haspopup="menu"]');

    await eleEmail.fill(validAcc.email);
    await elePassword.fill(validAcc.password);
    await eleBtnLogin.click();
    await expect(eleIconProfile).toBeVisible();
    //Test steps: Logout and verify test result
    const eleBtnLogout = page.locator('div[role="menuitem"]').filter({hasText: 'Log out'});
    const eleBtnSignup = page.getByRole('button', {name: 'Sign Up'});
    await eleIconProfile.click();
    await eleBtnLogout.click();
    await expect(eleBtnSignup).toBeVisible();
});