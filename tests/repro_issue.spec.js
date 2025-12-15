
import { test, expect } from '@playwright/test';

test('repro: form should be valid when only one tool is selected', async ({ page }) => {
    await page.goto('/index.html');

    // Fill minimal required fields
    await page.selectOption('select[name="開催日"]', '2025年12月19日');
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.selectOption('select[name="position"]', '経営者・役員');
    await page.fill('input[name="company"]', 'Test Co');
    await page.selectOption('select[name="industry"]', '製造業');
    await page.check('input[name="employees"][value="2〜5名"]');
    await page.check('input[name="ai_usage"][value="ほぼ毎日使っている"]');

    // Select just ONE tool
    await page.check('input[name="ai_tools"][value="ChatGPT（無料版）"]');

    // Select just ONE use case
    await page.check('input[name="use_cases"][value="文章作成（メール、提案書、報告書等）"]');

    // Select effectiveness
    await page.check('input[name="effectiveness"][value="3"]');

    // Select account/device
    await page.check('input[name="account_login"][value="ログイン可能（確認済み）"]');
    await page.check('input[name="device"][value="ノートパソコン（Windows）"]');

    // Fill textareas
    await page.fill('textarea[name="specific_goals"]', 'Goal');

    // Check form validity
    const isValid = await page.locator('form').evaluate(form => form.checkValidity());

    // This should be TRUE, but if my hypothesis is correct, it will be FALSE because other checkboxes are required
    expect(isValid).toBeTruthy();
});
