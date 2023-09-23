// https://github.com/alexreardon/tiny-invariant/blob/master/src/tiny-invariant.ts

/*
EXAMPLE

import { createBrowserClient } from '@supabase/auth-helpers-remix';
import invariant from 'tiny-invariant';
import type { Database } from './database.types';
import getEnv from './get-env';
 
export function getSupabaseBrowserClient() {
  // Get the environment variables
  const env = getEnv();
 
  invariant(env.SUPABASE_URL, `Supabase URL was not provided`);
  invariant(env.SUPABASE_ANON_KEY, `Supabase Anon key was not provided`);
 
  return createBrowserClient<Database>(
    env.SUPABASE_URL, 
    env.SUPABASE_ANON_KEY
  );
}
*/

const isProduction: boolean = process.env.NODE_ENV === "production";
const prefix: string = "Invariant failed";

// Throw an error if the condition fails
// Strip out error messages for production
// > Not providing an inline default argument for message as the result is smaller
export default function invariant(
  condition: any,
  // Can provide a string, or a function that returns a string for cases where
  // the message takes a fair amount of effort to compute
  message?: string | (() => string),
): asserts condition {
  if (condition) {
    return;
  }
  // Condition not passed

  // In production we strip the message but still throw
  if (isProduction) {
    throw new Error(prefix);
  }

  // When not in production we allow the message to pass through
  // *This block will be removed in production builds*

  const provided: string | undefined = typeof message === "function" ? message() : message;

  // Options:
  // 1. message provided: `${prefix}: ${provided}`
  // 2. message not provided: prefix
  const value: string = provided ? `${prefix}: ${provided}` : prefix;
  throw new Error(value);
}
