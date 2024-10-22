import { After, AfterAll, Before, BeforeAll, Status } from '@cucumber/cucumber';
import { closeBrowser, closeContext, createBrowser, createContext } from './setup-playwright';

BeforeAll(createBrowser());
AfterAll(closeBrowser());

Before(createContext());
After(closeContext());

import { trace, context, Span, Exception, SpanOptions } from '@opentelemetry/api';
import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';

import * as fs from 'fs';
import { ITestCaseHookParameter } from '@cucumber/cucumber/lib/support_code_library_builder/types';
import { CustomWorld } from '../../world/custom-world';

const testRunName = process.env.TEST_RUN_NAME || 'Unnamed Test Run';

const provider = new NodeTracerProvider({
  resource: new Resource({
    serviceName: 'cucumber-tests',
  }),
});

const exporter = new OTLPTraceExporter({
  url: 'http://localhost:50052/v1/traces',
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();

const tracer = trace.getTracer('cucumber-tests');

const results: unknown[] = [];
let testRunSpan: Span;

BeforeAll(async function () {
  testRunSpan = tracer.startSpan(`Test Run: ${testRunName}`);
  context.with(trace.setSpan(context.active(), testRunSpan), () => {
    console.log(`Test run '${testRunName}' started`);
  });
});

Before(function (this: CustomWorld, { pickle }: ITestCaseHookParameter) {
  const scenarioName = `Scenario: ${pickle.name}`;
  const spanOptions: SpanOptions = {
    kind: 1,
  };
  const scenarioSpan = tracer.startSpan(scenarioName, spanOptions);
  this.scenarioSpan = scenarioSpan as Span;
});

After(function (this: CustomWorld, { pickle, result }: ITestCaseHookParameter) {
  const span = this.scenarioSpan as Span;
  const scenarioResult = {
    name: pickle.name,
    status: result?.status,
    error: result?.exception ? result?.exception.message : null,
  };

  if (result?.status === Status.PASSED) {
    span.setStatus({ code: 1, message: 'Passed' });
  } else if (result?.status === Status.FAILED) {
    span.setStatus({ code: 2, message: 'Failed' });
    span.recordException(result?.exception as Exception);
  } else if (result?.status === Status.PENDING) {
    span.setStatus({ code: 0, message: 'Pending' });
  }

  results.push(scenarioResult);
  span.end();
});

AfterAll(function () {
  testRunSpan.end();
  const output = {
    testRunName: testRunName,
    scenarios: results,
  };
  fs.writeFileSync('./results.json', JSON.stringify(output, null, 2), 'utf-8');
});
