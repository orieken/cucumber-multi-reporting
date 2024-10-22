import { setWorldConstructor, World } from '@cucumber/cucumber';
import * as messages from '@cucumber/messages';
import { BrowserContext, Browser, Page } from 'playwright';
import { CustomWorldOptions } from './custom-world-options';
import { Span } from '@opentelemetry/api';

export class CustomWorld extends World {
  context?: BrowserContext;
  feature?: messages.Pickle;
  page!: Page;
  browser?: Browser;
  scenarioName?: string;
  scenarioSpan?: Span;

  constructor(options: CustomWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);
