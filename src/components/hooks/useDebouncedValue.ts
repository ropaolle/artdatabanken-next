import { useEffect, useState, useRef } from "react";

export function useDebouncedValue<T = any>(value: T, wait: number, options = { leading: false }) {
  const [_value, setValue] = useState(value);
  const mountedRef = useRef(false);
  // TODO: TypeScript do not like this, can I chnage the default value of timeOute ref from null to undefined?
  // const timeoutRef = useRef<number>(null);
  const timeoutRef = useRef<number>();
  const cooldownRef = useRef(false);

  const cancel = () => window.clearTimeout(timeoutRef.current);

  useEffect(() => {
    if (mountedRef.current) {
      if (!cooldownRef.current && options.leading) {
        cooldownRef.current = true;
        setValue(value);
      } else {
        cancel();
        timeoutRef.current = window.setTimeout(() => {
          cooldownRef.current = false;
          setValue(value);
        }, wait);
      }
    }
  }, [value, options.leading, wait]);

  useEffect(() => {
    mountedRef.current = true;
    return cancel;
  }, []);

  return [_value, cancel] as const;
}
