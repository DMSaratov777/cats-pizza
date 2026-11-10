import {test, expect} from '@playwright/test'

test('Sign in', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('signInBtn').click();
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Пароль').fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();
  await expect(page.getByTestId('logoutBtn')).toBeVisible();
});

test('Sign up', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('signInBtn').click();
  await page.getByTestId('register').click();
  await page.getByLabel('Имя').fill('Дмитрий');
  await page.getByLabel('Email').fill(`${Date.now()}@mail.com`);
  await page.getByLabel('Пароль:', {exact: true}).fill('Qwerty');
  await page.getByLabel('Повторите пароль:', {exact: true}).fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();
  await expect(page.getByTestId('logoutBtn')).toBeVisible();
});

test('Make order with login', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('catCard1').getByTestId('addToCartButton').click();
  await page.getByTestId('catModaladdToCartButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('goToCardPageButton').click();
  await page.getByTestId('makeOrderButton').click();
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Пароль').fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();
  await page.getByLabel('Город').fill('Саратов');
  await page.getByLabel('Улица').fill('Аржаного');
  await page.getByLabel('Дом').fill('5'); 
  await page.getByLabel('Квартира').fill('33');
  await page.getByLabel('Комментарий курьеру:').fill('2-ой подъезд');
  await page.getByTestId('approveOrder').click();
  await expect(page.getByTestId('modalTitle')).toHaveText('Заказ оформлен');
  await page.getByTestId('closeButton').click();
  await page.getByTestId('openOrders').click();
  await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
});

test('Make order ', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('signInBtn').click();
  await page.getByLabel('Email').fill('test@test.ru');
  await page.getByLabel('Пароль').fill('Qwerty');
  await page.getByTestId('signInOrSignUpButton').click();
  await page.getByTestId('catCard1').getByTestId('addToCartButton').click();
  await page.getByTestId('catModaladdToCartButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('goToCardPageButton').click();
  await page.getByTestId('makeOrderButton').click();
  await page.getByLabel('Город').fill('Саратов');
  await page.getByLabel('Улица').fill('Аржаного');
  await page.getByLabel('Дом').fill('5'); 
  await page.getByLabel('Квартира').fill('33');
  await page.getByLabel('Комментарий курьеру:').fill('2-ой подъезд');
  await page.getByTestId('approveOrder').click();
  await expect(page.getByTestId('modalTitle')).toHaveText('Заказ оформлен');
  await page.getByTestId('closeButton').click();
  await page.getByTestId('openOrders').click();
  await expect(page.getByTestId('ordersList').getByRole('listitem').first()).toBeVisible();
});