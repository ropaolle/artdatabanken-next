"use client";

import { useSubscribe } from "@/components/hooks/useSubscribe";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { Species } from "@/types/app.types";

export default function Collections() {
  const events = useSubscribe<Species>("app", "*");

  return (
    <>
      <h1>Realtime updates</h1>
      <TooltipProvider>
        <table className="w-full table-auto">
          <thead className=" bg-slate-200 text-left">
            <tr>
              <th className="border border-slate-300 px-4 py-2">Type</th>
              <th className="border border-slate-300 px-4 py-2">User</th>
              <th className="border border-slate-300 px-4 py-2">Time</th>
              <th className="border border-slate-300 px-4 py-2">Message</th>
            </tr>
          </thead>
          <tbody>
            {events.map(({ type, user, message, time }, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{type}</td>
                <td className="border px-4 py-2">{user?.email}</td>
                <td className="border px-4 py-2">{time}</td>
                <td className="border px-4 py-2">
                  {typeof message === "string" ? (
                    message
                  ) : (
                    <Tooltip>
                      <TooltipTrigger>
                        <span className="underline decoration-dotted underline-offset-4">data</span>
                      </TooltipTrigger>
                      <TooltipContent className="text-sm">
                        <pre>{JSON.stringify(message, null, 2)}</pre>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TooltipProvider>
    </>
  );
}
