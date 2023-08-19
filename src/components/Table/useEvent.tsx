"use client";

import { useEffect } from "react";

export default function useEvent(type: string, handleEvent: any) {
  useEffect(() => {
    if (typeof handleEvent !== "function") return;
    window.addEventListener(type, handleEvent);
    return () => {
      window.removeEventListener(type, handleEvent);
    };
  }, [type, handleEvent]);
}
