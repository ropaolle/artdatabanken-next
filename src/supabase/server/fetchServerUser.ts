import createServerComponentClientWithCookies from "./createServerComponentClientWithCookies";
import { fetchUser } from "../fetchUser";

export const fetchServerUser = () => fetchUser(createServerComponentClientWithCookies());
