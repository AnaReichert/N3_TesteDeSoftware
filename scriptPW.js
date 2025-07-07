const { test, expect } = require('@playwright/test');

test('Cadastrar usuário', async ({ page }) => {
    await page.goto('http://127.0.0.1:5500/frontend/index.html');
    await page.fill('#nome', 'Usuário');
    await page.fill('#email', 'usuario@exemplo.com');
    await page.click('button');
    await expect(page.locator('#lista')).toContainText('Usuário');
});
