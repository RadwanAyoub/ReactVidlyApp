import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

function init() {
  Sentry.init({
    dsn: "https://093f857e63bc44728c06689266bfebdb@o1012452.ingest.sentry.io/5977919",
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function captureEx(error) {
  Sentry.captureException(error);
}

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  init,
  captureEx,
};
