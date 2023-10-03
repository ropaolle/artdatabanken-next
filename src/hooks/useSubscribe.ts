import { useSupabase } from "@/supabase/database";
import type { BrodcastChannels, BrodcastEvents, User } from "@/types/app.types";
import { useState } from "react";

export function useSubscribe<T = unknown>(channel: BrodcastChannels, event: BrodcastEvents) {
  const [events, setEvents] = useState<{ type?: String; message: T; user: User; time: string }[]>([]);
  const supabase = useSupabase();
  const channelSpecies = supabase.channel(channel);

  channelSpecies
    .on("broadcast", { event }, ({ payload }) => {
      setEvents((prev) => [...prev, payload]);
    })
    .subscribe();

  return events;
}
