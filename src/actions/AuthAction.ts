"use server";

import { extApi } from "@/lib/api";
import ac from "@/lib/safe-action";
import { LoginSchema } from "@/types/LoginSchema";
import { RegisterSchema } from "@/types/RegisterSchema";

export const EmailSignInAction = ac(
  LoginSchema,
  async ({ email, password }) => {
    // make query
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
    if (res.status === 404) {
      return { error: "Email does not exist. try registering instead!" };
    }
    return {
      success: res.data,
    };
  }
);

export const RegisterUserAction = ac(
  RegisterSchema,
  async ({ firstName, lastName, email, password }) => {
    //make query
    const res = await extApi.post(
      "/auth/register",
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
      {
        withCredentials: true,
      }
    );

    // if (res.status === 409) {
    //   return { error: "Email already exists. try login instead!" };
    // }
    // if (res.status === 400) {
    //   return { error: "Bad request." };
    // }
    // if (res.status === 200) {
    //   return { success: res.data };
    // }
    return res;
  }
);
