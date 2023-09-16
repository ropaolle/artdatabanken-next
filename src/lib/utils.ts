import * as crypto from "crypto";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ReactNode } from "react";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
const sleep = (milliseconds: number) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const truncateString = (text: string | null, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

const md5 = (contents: string) => crypto.createHash("md5").update(contents).digest("hex");

const gravatarURL = (email: string) => `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`;

const uuid = () => crypto.randomUUID();

const canvasToBlob = async (ref: HTMLCanvasElement, type = "image/jpeg"): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    ref.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob"));
        return;
      }
      resolve(blob);
    }, type);
  });
};

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes == 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
};

const toOptions = (options: { [key: string]: { value: string; label: ReactNode } }) =>
  Object.values(options).map(({ value, label }) => ({ value, label }));

export { cn, sleep, truncateString, gravatarURL, uuid, canvasToBlob, formatBytes, toOptions };

/* INFO: Unused stuff

export const suffixFilename = (filename: string, suffix: string) => {
  const lastIndex = filename.lastIndexOf(".");
  if (lastIndex === -1) return filename + suffix;
  return filename.slice(0, lastIndex) + suffix + filename.slice(lastIndex);
};

export const canvasToFile = async (ref: HTMLCanvasElement, filename: string, type = "image/jpeg"): Promise<File> => {
  return new Promise((resolve, reject) => {
    ref.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Failed to create blob"));
        return;
      }
      resolve(new File([blob], filename, { type }));
    }, type);
  });
}; 

const clearCanvas = (canvasRef: RefObject<HTMLCanvasElement>) => {
  const { current: canvas } = canvasRef || {};
  const ctx = canvas?.getContext("2d");
  if (canvas && ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}; 

*/
