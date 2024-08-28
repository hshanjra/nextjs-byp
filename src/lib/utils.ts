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

export function formatDate(
  dateString: Date,
  options: { format: "short" | "numeric" | "long" } = { format: "long" },
) {
  if (!dateString) return "";
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

export function transformText(
  string: string,
  options: {
    format: "capitalFirstOnly" | "capitalCase" | "lowerCase" | "camelCase";
  } = { format: "capitalFirstOnly" },
) {
  switch (options.format) {
    case "capitalFirstOnly":
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    case "capitalCase":
      return string
        .toLowerCase()
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    case "lowerCase":
      return string.toLowerCase();

    case "camelCase":
      return string
        .toLowerCase()
        .split(" ")
        .map((word, index) =>
          index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
        )
        .join("");

    default:
      return string;
  }
}

export function calculatePositiveFeedbackPercentage(
  averageRating: number,
  positiveThreshold: number = 4,
) {
  if (averageRating < 0 || averageRating > 5) {
    throw new Error("Invalid average rating. It should be between 0 and 5.");
  }

  // If average rating is below the threshold, return 0% positive feedback
  if (averageRating < positiveThreshold) {
    return 0;
  }

  // Calculate the positive feedback percentage based on average rating
  const positiveFeedbackPercentage =
    ((averageRating - positiveThreshold + 1) / (5 - positiveThreshold + 1)) *
    100;

  return Math.floor(positiveFeedbackPercentage); // Returns the integer part only
}
