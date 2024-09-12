/*
 * Code generated by Speakeasy (https://speakeasy.com). DO NOT EDIT.
 */

import { VercelCore } from "../core.js";
import { encodeJSON as encodeJSON$ } from "../lib/encodings.js";
import * as m$ from "../lib/matchers.js";
import * as schemas$ from "../lib/schemas.js";
import { RequestOptions } from "../lib/sdks.js";
import { pathToFunc } from "../lib/url.js";
import {
  ConnectionError,
  InvalidRequestError,
  RequestAbortedError,
  RequestTimeoutError,
  UnexpectedClientError,
} from "../models/errors/httpclienterrors.js";
import { SDKError } from "../models/errors/sdkerror.js";
import { SDKValidationError } from "../models/errors/sdkvalidationerror.js";
import {
  EmailLoginRequestBody,
  EmailLoginRequestBody$outboundSchema,
  EmailLoginResponseBody,
  EmailLoginResponseBody$inboundSchema,
} from "../models/operations/emaillogin.js";
import { Result } from "../types/fp.js";

/**
 * Login with email
 *
 * @remarks
 * Request a new login for a user to get a token. This will respond with a verification token and send an email to confirm the request. Once confirmed you can use the verification token to get an authentication token.
 */
export async function authenticationLogin(
  client$: VercelCore,
  request?: EmailLoginRequestBody | undefined,
  options?: RequestOptions,
): Promise<
  Result<
    EmailLoginResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >
> {
  const input$ = request;

  const parsed$ = schemas$.safeParse(
    input$,
    (value$) => EmailLoginRequestBody$outboundSchema.optional().parse(value$),
    "Input validation failed",
  );
  if (!parsed$.ok) {
    return parsed$;
  }
  const payload$ = parsed$.value;
  const body$ = payload$ === undefined
    ? null
    : encodeJSON$("body", payload$, { explode: true });

  const path$ = pathToFunc("/registration")();

  const headers$ = new Headers({
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  const context = {
    operationID: "emailLogin",
    oAuth2Scopes: [],
    securitySource: null,
  };

  const requestRes = client$.createRequest$(context, {
    method: "POST",
    path: path$,
    headers: headers$,
    body: body$,
    timeoutMs: options?.timeoutMs || client$.options$.timeoutMs || -1,
  }, options);
  if (!requestRes.ok) {
    return requestRes;
  }
  const request$ = requestRes.value;

  const doResult = await client$.do$(request$, {
    context,
    errorCodes: ["400", "4XX", "5XX"],
    retryConfig: options?.retries
      || client$.options$.retryConfig,
    retryCodes: options?.retryCodes || ["429", "500", "502", "503", "504"],
  });
  if (!doResult.ok) {
    return doResult;
  }
  const response = doResult.value;

  const [result$] = await m$.match<
    EmailLoginResponseBody,
    | SDKError
    | SDKValidationError
    | UnexpectedClientError
    | InvalidRequestError
    | RequestAbortedError
    | RequestTimeoutError
    | ConnectionError
  >(
    m$.json(200, EmailLoginResponseBody$inboundSchema),
    m$.fail([400, "4XX", "5XX"]),
  )(response);
  if (!result$.ok) {
    return result$;
  }

  return result$;
}
