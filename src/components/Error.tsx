import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
// import { useEffect } from "react";

export function PageError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  // useEffect(() => {
  //   // TODO: Log the error to sentry.io
  //   console.error(error);
  // }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-20 text-center">
      <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-6xl font-semibold leading-snug text-transparent">
        Something went wrong (page)!
      </div>
      <div className="mt-6">{error.message}</div>
      <div className="mt-2 text-slate-400">current path: {pathname}</div>
      <div className="mt-10">
        <Button variant={"secondary"} onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}

export function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const pathname = usePathname();
  // useEffect(() => {
  //   // TODO: Log the error to sentry.io
  //   console.error(error);
  // }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-20 text-center">
      <div className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-6xl font-semibold leading-snug text-transparent">
        Something went wrong (global)!
      </div>
      <div className="mt-6">{error.message}</div>
      <div className="mt-2 text-slate-400">current path: {pathname}</div>
      <div className="mt-10">
        <Button variant={"secondary"} onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
