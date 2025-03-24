import { cookies } from "next/headers";

export async function getAuthToken() {
  let authToken = cookies().get("jwt")?.value;

  if (!authToken) {
    authToken = localStorage.getItem("jwt");
  }

  return authToken;
}
