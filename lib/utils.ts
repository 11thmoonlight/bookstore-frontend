import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getStrapiURL() {
  return (
    process.env.NEXT_PUBLIC_STRAPI_URL ??
    "http://backend-production-dd5c.up.railway.app"
  );
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
};
