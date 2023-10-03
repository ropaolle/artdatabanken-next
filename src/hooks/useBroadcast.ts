import { useAppStore } from "@/state";
import { useSupabase } from "@/supabase/database";
import type { BrodcastChannels, BrodcastEvents } from "@/types/app.types";

export function useBroadcast<T = unknown>(channel: BrodcastChannels, event: BrodcastEvents) {
  const { settings, user } = useAppStore();

  const client = useSupabase();
  const channelSpecies = client.channel(channel);

  return (message: T, type = "unknown") => {
    if (!settings.broadcast) return;

    channelSpecies.subscribe((status) => {
      if (status !== "SUBSCRIBED") return null;

      channelSpecies.send({
        type: "broadcast",
        event: event,
        payload: { type, message, user, time: new Date().toLocaleTimeString() },
      });
    });
  };
}
