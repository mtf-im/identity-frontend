import { useCookies } from "@vueuse/integrations/useCookies";
import { AuthTokenPayload } from "./types.ts";
import { decodeJwt } from "jose";

let tokenCookies = useCookies(["token"]);

export function checkLogin(): boolean {
    let token = tokenCookies.get("token");
    if (!(typeof token == "string")) return false;
    let parsed = parseAuthToken(token);

    return parsed.exp > Date.now() / 1000;
}

export function parseAuthToken(token: string): AuthTokenPayload {
    return decodeJwt<AuthTokenPayload>(token);
}
