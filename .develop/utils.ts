import { RefObject } from "react";

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes == 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(decimals)) + " " + sizes[i];
};

const uuid = () => crypto.randomUUID();

const truncateString = (text: string | null, maxLength = 18) =>
  text ? (text.length > maxLength ? text.slice(0, maxLength - 1) + "&hellip;" : text) : "";

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
