import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const sleep = (milliseconds: number) =>
  new Promise((resolve) => {
    console.info(`Sleping... ${milliseconds} milliseconds`);
    return setTimeout(resolve, milliseconds);
  });

export { cn, sleep };
