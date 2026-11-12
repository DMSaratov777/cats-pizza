import {test, expect, request} from '@playwright/test'

const TEST_USER_EMAIL = 'test@test.ru';
const TEST_USER_PASSWORD = 'Qwerty';
const API_URL = 'http://localhost:3001/api';

test.describe('Auth', () => {
let createdUserEmail: string | null = null;

test.afterAll(async({request}) => {
  
  if(!createdUserEmail) return;

  await request.delete(`${API_URL}/users/by-email`, {
    data: {email: createdUserEmail}
  });

createdUserEmail = null;

});

test('Sign in', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('signInBtn').click();
  await page.getByLabel('Email').fill(TEST_USER_EMAIL);
  await page.getByLabel('Пароль').fill(TEST_USER_PASSWORD);
  await page.getByTestId('signInOrSignUpButton').click();
  await expect(page.getByTestId('logoutBtn')).toBeVisible();
});

test('Sign up', async ({ page }) => {

  createdUserEmail = `${Date.now()}@mail.com`

  await page.goto('');
  await page.getByTestId('signInBtn').click();
  await page.getByTestId('register').click();
  await page.getByLabel('Имя').fill('Дмитрий');
  await page.getByLabel('Email').fill(createdUserEmail);
  await page.getByLabel('Пароль:', {exact: true}).fill(TEST_USER_PASSWORD);
  await page.getByLabel('Повторите пароль:', {exact: true}).fill(TEST_USER_PASSWORD);
  await page.getByTestId('signInOrSignUpButton').click();
  await expect(page.getByTestId('logoutBtn')).toBeVisible();
 });
});


test.describe('Orders', () =>{

  test.describe.configure({mode: 'serial'});

  test.afterEach( async ({request}) =>{
     await request.delete(`${API_URL}/orders/by-email`, {
    data: {email: TEST_USER_EMAIL}
  });
  });


  test('Make order with login', async ({ page }) => {
  await page.goto('');
  await page.getByTestId('catCard1').getByTestId('addToCartButton').click();
  await page.getByTestId('catModaladdToCartButton').click();
  await page.getByTestId('openCartButton').click();
  await page.getByTestId('goToCardPageButton').click();
  await page.getByTestId('makeOrderButton').click();
  await page.getByLabel('Email').fill(TEST_USER_EMAIL);
  await page.getByLabel('Пароль').fill(TEST_USER_PASSWORD);
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
  await page.getByLabel('Email').fill(TEST_USER_EMAIL);
  await page.getByLabel('Пароль').fill(TEST_USER_PASSWORD);
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
});

