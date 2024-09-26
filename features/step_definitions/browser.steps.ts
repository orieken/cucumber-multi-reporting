import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world/custom-world';
import { Page } from 'playwright';
import { expect } from '@playwright/test';
import looksSame from 'looks-same';

setDefaultTimeout(600 * 10000);

When('I navigate to the url {string}', async function(this: CustomWorld, url: string) {
  const page: Page = this.page as Page;

  await page.goto(url);
});

Then('I should see the title {string}', async function(this: CustomWorld, pageTitle: string) {
  const page: Page = this.page as Page;

  await expect(page.title()).resolves.toEqual(pageTitle);
});

let beforeScreenshot: Buffer;
let afterScreenshot: Buffer;

Given('I take a before screenshot', async function(this: CustomWorld) {
  beforeScreenshot = await this.page.screenshot();
  this.attach(beforeScreenshot, 'image/png');
});

Given('I set the search', async function(this: CustomWorld) {
  const { page } = this as CustomWorld;
  await page.getByLabel('Search', { exact: true }).click();
  await page.getByLabel('Search', { exact: true }).fill('abc');
});

Given('I take an after screenshot', async function(this: CustomWorld) {
  afterScreenshot = await this.page.screenshot();
  this.attach(afterScreenshot, 'image/png');
});

Then('the page should look the same', async function(this: CustomWorld) {
  const { equal } = await looksSame(beforeScreenshot, afterScreenshot, { ignoreCaret: true });
  const buffer = await looksSame.createDiff({
    reference: beforeScreenshot,
    current: afterScreenshot,
    highlightColor: '#ff00ff', // color to highlight the differences
    strict: false, // strict comparsion
    tolerance: 2.5,
    antialiasingTolerance: 0,
    ignoreAntialiasing: true, // ignore antialising by default
    ignoreCaret: true, // ignore caret by default
  });

  this.attach(buffer, 'image/png');

  expect(equal).toBeTruthy();
});
