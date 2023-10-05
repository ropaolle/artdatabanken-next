export default function suffixFilename(filename: string, suffix: string) {
  const lastIndex = filename.lastIndexOf(".");
  if (lastIndex === -1) return filename + suffix;
  const name = filename.slice(0, lastIndex);
  const ext = filename.slice(lastIndex);
  return `${name}${suffix}${ext}`;
}
