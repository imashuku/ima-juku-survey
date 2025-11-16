import { test, expect } from '@playwright/test';

test.describe('IMA-JUKU Survey Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/index.html');
  });

  test('should display the survey form with all sections', async ({ page }) => {
    // タイトルの確認
    await expect(page.locator('h1')).toContainText('IMA-JUKU 生成AI活用セミナー');

    // 主要な質問項目の存在確認
    await expect(page.getByText('お名前')).toBeVisible();
    await expect(page.getByText('メールアドレス')).toBeVisible();
    await expect(page.getByText('会社名・屋号')).toBeVisible();
    await expect(page.getByText('現在、生成AIをどの程度利用していますか？')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    // フォーム送信ボタンをクリック
    await page.getByRole('button', { name: '送信する' }).click();

    // HTML5バリデーションが発動することを確認
    // 必須フィールドが入力されていない場合は送信されない
    const nameInput = page.locator('input[name="name"]');
    await expect(nameInput).toBeFocused();
  });

  test('should fill out basic required fields', async ({ page }) => {
    // 必須フィールドのみを入力してフォームが有効になることを確認
    await page.fill('input[name="name"]', 'テスト太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'テスト株式会社');
    await page.selectOption('select[name="industry"]', '製造業');
    await page.check('input[name="employees"][value="2〜5名"]');
    await page.check('input[name="ai_usage"][value="ほぼ毎日使っている"]');
    await page.fill('textarea[name="specific_goals"]', '業務効率を50%向上させたい');

    // 入力された値が正しく反映されていることを確認
    await expect(page.locator('input[name="name"]')).toHaveValue('テスト太郎');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
    await expect(page.locator('textarea[name="specific_goals"]')).toHaveValue('業務効率を50%向上させたい');

    // 送信ボタンが有効であることを確認（実際には送信しない）
    const submitButton = page.getByRole('button', { name: '送信する' });
    await expect(submitButton).toBeEnabled();
  });

  test('should allow selecting "その他" options', async ({ page }) => {
    // 業種で「その他」を選択可能であることを確認
    await page.selectOption('select[name="industry"]', 'その他');
    const selectedIndustry = await page.locator('select[name="industry"]').inputValue();
    expect(selectedIndustry).toBe('その他');

    // AI利用ツールの「その他」チェックボックスを選択可能であることを確認
    const otherCheckbox = page.locator('input[name="ai_tools"][value="その他"]');
    await otherCheckbox.check();
    await expect(otherCheckbox).toBeChecked();
  });

  test('should synchronize email field with reply-to field', async ({ page }) => {
    const email = 'sync-test@example.com';

    // メールアドレスを入力
    await page.fill('input[name="email"]', email);

    // _replytoフィールドも同じ値になることを確認
    await expect(page.locator('input[name="_replyto"]')).toHaveValue(email);
  });

  test('should have honeypot field for spam protection', async ({ page }) => {
    // ハニーポットフィールドが存在し、非表示であることを確認
    const honeypot = page.locator('input[name="_gotcha"]');
    await expect(honeypot).toBeHidden();
  });

  test('should display form in responsive layout', async ({ page }) => {
    // モバイルビューポート
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('h1')).toBeVisible();

    // タブレットビューポート
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('h1')).toBeVisible();

    // デスクトップビューポート
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    const emailInput = page.locator('input[name="email"]');

    // 無効なメールアドレス
    await emailInput.fill('invalid-email');
    await page.getByRole('button', { name: '送信する' }).click();

    // HTML5バリデーションメッセージを確認
    const validationMessage = await emailInput.evaluate((el) => el.validationMessage);
    expect(validationMessage).toBeTruthy();
  });

  test('should have all required labels and accessibility features', async ({ page }) => {
    // フォーム要素が適切にラベル付けされているか確認
    await expect(page.getByText('お名前')).toBeVisible();
    await expect(page.getByText('メールアドレス')).toBeVisible();

    // 必須マークの存在確認
    const requiredMarkers = page.locator('.required');
    await expect(requiredMarkers.first()).toBeVisible();
  });

  test('should have enabled submit button when required fields are filled', async ({ page }) => {
    // 必須フィールドを入力
    await page.fill('input[name="name"]', 'テスト太郎');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="company"]', 'テスト株式会社');
    await page.selectOption('select[name="industry"]', '製造業');
    await page.check('input[name="employees"][value="2〜5名"]');
    await page.check('input[name="ai_usage"][value="ほぼ毎日使っている"]');
    await page.fill('textarea[name="specific_goals"]', 'テスト目標');

    const submitButton = page.getByRole('button', { name: '送信する' });

    // 送信ボタンが有効であることを確認
    await expect(submitButton).toBeEnabled();
  });
});
