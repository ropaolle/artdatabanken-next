// https://gist.github.com/dan-cooke/171b8e43e0753cf6235706c8e63b3dc7

/* import { SetStateAction, useCallback, useState } from "react";
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type FetchCallback = (value: SetStateAction<boolean>) => void;
export default function useLazyQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(key: TQueryKey, fn: any, options: any = {}): readonly [FetchCallback, UseQueryResult<unknown, unknown>] {
  const [enabled, setEnabled] = useState(false);
  const query: UseQueryResult<TData, TError> = useQuery<TData, TError>(key, fn, { ...options, enabled });

  return [useCallback<FetchCallback>(() => setEnabled(true), []), query] as const;
} */

import { useCallback, useState } from "react";
import { QueryFunction, QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "@tanstack/react-query";

type UseQueryParams = Parameters<typeof useQuery>;

export default function useLazyQuery<TData, TError>(
  key: UseQueryParams[0],
  fetchFn: QueryFunction<TData, QueryKey>,
  options?: Omit<UseQueryOptions<TData, TError, unknown, QueryKey>, "queryKey" | "queryFn">,
): [() => void, UseQueryResult<unknown, unknown>] {
  const [enabled, setEnabled] = useState(false);

  const query = useQuery<TData, TError, unknown, QueryKey>(key, fetchFn, {
    ...(options || {}),
    enabled,
  });

  const trigger = useCallback(() => {
    if (!enabled) {
      setEnabled(true);
    }
  }, [fetchFn, enabled]);

  return [trigger, query];
}
