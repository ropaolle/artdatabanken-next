import * as crypto from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export const truncateString = (text: string | null, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

const md5 = (contents: string) => crypto.createHash("md5").update(contents).digest("hex");

export const gravatarURL = (email: string) => `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`;

export const uuid = () => crypto.randomUUID();
