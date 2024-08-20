import { type ClassValue, clsx } from "clsx";
import { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  price: number | string,
  options: {
    currency?: "USD";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "USD", notation = "standard" } = options;

  const numericPrice = typeof price === "string" ? parseFloat(price) : price;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericPrice);
}

export function trimString(str: string, maxLength: number) {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + "...";
  }
  return str;
}

export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  const paramsString = params.toString();
  const queryString = `${paramsString.length ? "?" : ""}${paramsString}`;

  return `${pathname}${queryString}`;
}

export function formatDate(dateString: string, options = { format: "long" }) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const monthLong = date.toLocaleString("en-US", { month: "long" });
  const monthShort = date.toLocaleString("en-US", { month: "short" });
  const year = date.getUTCFullYear();

  switch (options.format) {
    case "short": // 27 Jun 2024
      return `${day} ${monthShort} ${year}`;
    case "numeric": // 27/06/2024
      return `${day}/${String(date.getUTCMonth() + 1).padStart(2, "0")}/${year}`;
    case "long": // 27 June 2024
    default:
      return `${day} ${monthLong} ${year}`;
  }
}
