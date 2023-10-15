"use client";

import { useToast } from "@/components/ui/use-toast";
import { Query, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function ReactQueryClientProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error: any, query: Query) =>
            toast({
              title: "API error!",
              description: (
                <>
                  {error?.message} (query key: <b>{query.queryKey.toString()}</b>)
                </>
              ),
              variant: "destructive",
            }),
        }),
      }),
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
