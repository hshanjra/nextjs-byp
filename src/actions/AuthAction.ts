"use server";

import { extApi } from "@/lib/api";
import ac from "@/lib/safe-action";
import { LoginSchema } from "@/types/LoginSchema";
import { RegisterSchema } from "@/types/RegisterSchema";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const EmailSignInAction = ac(
  LoginSchema,
  async ({ email, password }) => {
    // make query
    const { data, status } = await extApi.post(
      "/auth/login",
      {
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    if (status === 404) {
      return { error: "Email does not exist. try registering instead!" };
    }

    if (status === 200) {
      return {
        success: data,
      };
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
