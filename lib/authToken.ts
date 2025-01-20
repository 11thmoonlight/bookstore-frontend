"use server";

import { getAuthToken } from "@/data/services/get-token";

export async function fetchAuthToken() {
  const token = await getAuthToken();
  return token;
}
