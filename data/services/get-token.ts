import { cookies } from "next/headers";

export async function getAuthToken() {
  let authToken: string | undefined = cookies().get("jwt")?.value;

  if (!authToken) {
    authToken = localStorage.getItem("jwt") ?? undefined;
  }

  return authToken;
}
