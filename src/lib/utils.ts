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

export const canvasToBlob = async (ref: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    ref.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob"));
        return;
      }
      resolve(blob);
    }, "image/jpeg");
  });
};

/* const clearCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { current: canvas } = canvasRef || {};
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}; */
