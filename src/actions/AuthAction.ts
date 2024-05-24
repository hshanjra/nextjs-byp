"use server";

import { extApi } from "@/lib/api";
import ac from "@/lib/safe-action";
import { LoginSchema } from "@/types/LoginSchema";
import { RegisterSchema } from "@/types/RegisterSchema";
import { cookies } from "next/headers";

export const EmailSignInAction = ac(
  LoginSchema,
  async ({ email, password }) => {
    // make query
    try {
      const res = await extApi.post(
        "/auth/login",
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      // Set the cookie
      cookies().set("accessToken", res.data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      return {
        success: "Logged in successfully.",
      };
    } catch (error: any) {
      if (error.status === 404) {
        return { error: "Email does not exist. try registering instead!" };
      }
    }
  }
);

export const RegisterUserAction = ac(
  RegisterSchema,
  async ({ firstName, lastName, email, password }) => {
    try {
      // Make query
      const res = await extApi.post(
        "/auth/register",
        {
          firstName,
          lastName,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      // Set the cookie
      cookies().set("accessToken", res.data.accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      return {
        success: `Verification code has been sent on ${email}`,
      };
    } catch (error: any) {
      if (error.status === 409) {
        return { error: "Email already exists. Try login instead!" };
      }

      if (error.status === 400) {
        return { error: "Please check your inputs." };
      }

      if (error?.request) {
        // The request was made but no response was received
        return { error: "No response from server. Please try again later." };
      } else {
        // Something happened in setting up the request that triggered an Error
        return { error: error.message || "An unknown error occurred." };
      }
    }
  }
);
