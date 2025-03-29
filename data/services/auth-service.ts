import axios, { AxiosError } from "axios";
import { getStrapiURL } from "@/lib/utils";

interface RegisterUserProps {
  username: string;
  password: string;
  email: string;
}

interface LoginUserProps {
  identifier: string;
  password: string;
}

const baseUrl = getStrapiURL();

export async function registerUserService(userData: RegisterUserProps) {
  const url = `${baseUrl}/api/auth/local/register`;
  const query = "populate=*";

  try {
    const registerResponse = await axios.post(url, userData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    const token = registerResponse.data.jwt;

    const userResponse = await axios.get(`${baseUrl}/api/users/me?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return { jwt: token, user: userResponse.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login Error Response:", error.response?.data);

      if (error.response?.status === 400 || error.response?.status === 401) {
        return { error: "Invalid username or password." };
      }
    }

    return { error: "Something went wrong. Please try again." };
  }
}

export async function loginUserService(userData: LoginUserProps) {
  const url = `${baseUrl}/api/auth/local`;
  const query = "populate=*";

  try {
    const loginResponse = await axios.post(url, userData, {
      headers: { "Content-Type": "application/json" },
    });

    const token = loginResponse.data.jwt;

    const userResponse = await axios.get(`${baseUrl}/api/users/me?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return { jwt: token, user: userResponse.data };
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login Error Response:", error.response?.data);

      if (error.response?.status === 400 || error.response?.status === 401) {
        return { error: "Invalid username or password." };
      }
    }

    return { error: "Something went wrong. Please try again." };
  }
}
