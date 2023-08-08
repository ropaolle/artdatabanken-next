import * as crypto from "crypto";

export type User = {
  id: string;
  email: string | undefined;
  role: string | undefined;
  gravatar: string;
};

const md5 = (contents: string) => crypto.createHash("md5").update(contents).digest("hex");

export const gravatarURL = (email: string) => `https://www.gravatar.com/avatar/${md5(email)}?d=robohash`;
