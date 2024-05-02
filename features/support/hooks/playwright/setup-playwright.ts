import { chromium, firefox, webkit } from 'playwright';
import { browserOptions } from './browser-options';
import { CustomWorld } from '../../world/custom-world';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { Browser } from 'playwright';
import { Status } from '@cucumber/cucumber';

declare global {
  // eslint-disable-next-line no-var
  var browser: Browser;

  namespace NodeJS {
    interface Global {
      browser: Browser;
    }
  }
}

const browsers: { [k: string]: () => Promise<Browser> } = {
  firefox: async (): Promise<Browser> => firefox.launch(browserOptions),
  webkit: async (): Promise<Browser> => webkit.launch(browserOptions),
  chrome: async (): Promise<Browser> => chromium.launch({ ...browserOptions, channel: 'chrome' }),
  chromium: async (): Promise<Browser> => chromium.launch(browserOptions),
};

export function createBrowser(): () => Promise<void> {
  return async function () {
    global.browser = await browsers[process.env.BROWSER ?? 'chrome']();
  };
}

export function closeBrowser(): () => Promise<void> {
  return async function () {
    await global.browser.close();
  };
}

export function createContext(): (this: CustomWorld, { pickle }: ITestCaseHookParameter) => Promise<void> {
  return async function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
    this.context = await global.browser.newContext({
      acceptDownloads: true,
    });

    this.page = await this.context?.newPage();
    this.feature = pickle;
  };
}

async function attachScreenshot(this: CustomWorld) {
  const image = await this.page?.screenshot();
  image && (await this.attach(image, 'image/png'));
}

async function createReport(this: CustomWorld, { result }: ITestCaseHookParameter) {
  if (result) {
    await this.attach(`Status: ${result?.status}. Duration:${result.duration?.seconds}}s`);
    if (result.status !== Status.PASSED) {
      await attachScreenshot.call(this);
    }
  }
}

export function closeContext(): (this: CustomWorld, hookParameter: ITestCaseHookParameter) => Promise<void> {
  return async function (this: CustomWorld, { result }: ITestCaseHookParameter) {
    await createReport.call(this, { result } as ITestCaseHookParameter);

    await this.page?.close();
    await this.context?.close();
  };
}
