/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as academy from "../academy.js";
import type * as admin from "../admin.js";
import type * as auth from "../auth.js";
import type * as church from "../church.js";
import type * as fund from "../fund.js";
import type * as http from "../http.js";
import type * as membership from "../membership.js";
import type * as outreach from "../outreach.js";
import type * as payments from "../payments.js";
import type * as seed from "../seed.js";
import type * as staff from "../staff.js";
import type * as users from "../users.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  academy: typeof academy;
  admin: typeof admin;
  auth: typeof auth;
  church: typeof church;
  fund: typeof fund;
  http: typeof http;
  membership: typeof membership;
  outreach: typeof outreach;
  payments: typeof payments;
  seed: typeof seed;
  staff: typeof staff;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
