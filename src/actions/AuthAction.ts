"use server";

import { extApi } from "@/lib/api";
import ac from "@/lib/safe-action";
import {
  EmailVerificationSchema,
  GetUserSchema,
  LoginForm,
  LoginSchema,
  RegisterForm,
  RegisterSchema,
  UserSchema,
} from "@/types/authSchema";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types";
import { SITE_METADATA } from "@/constants";

export const Login = async (
  values: LoginForm,
): Promise<{ user: User | null; error: string | null }> => {
  // validate
  const { email, password } = LoginSchema.parse(values);

  // make request
  try {
    const { data } = await extApi.post("/auth/login", {
      email: email,
      password: password,
    });

    const token = data.accessToken;

    // Set token in the cookie
    cookies().set({
      name: "accessToken",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });

    // decode token
    const decodedToken = jwtDecode(token) as any;

    // construct user object
    const user = {
      fullName: decodedToken.fullName,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      isEmailVerified: decodedToken.isEmailVerified,
    };

    return { user, error: null };
  } catch (error: any) {
    console.log(error);
    if (error.status === 404) {
      return {
        user: null,
        error: "Email or password is incorrect",
      };
    }
    if (error.status === 401) {
      return { user: null, error: "Email or password is incorrect" };
    }
    return { user: null, error: error.message };
  }
};

export const Register = async (values: RegisterForm) => {
  // validate
  const { email, password, firstName, lastName } = RegisterSchema.parse(values);

  // make query
  try {
    const { data } = await extApi.post("/auth/register", {
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });

    // decode token
    const decodedToken = jwtDecode(data.accessToken) as any;

    const user = {
      fullName: decodedToken.fullName,
      firstName: decodedToken.firstName,
      lastName: decodedToken.lastName,
      isEmailVerified: decodedToken.isEmailVerified,
    };

    return { user, error: null };
  } catch (error: any) {
    console.log(error);
    if (error.status === 404) {
      return {
        user: null,
        error: "Email does not exist. try registering instead!",
      };
    }
    if (error.status === 401) {
      return { user: null, error: "Email or password is incorrect" };
    }
    return { user: null, error: error.message };
  }
};

export const Logout = async () => {
  // make query
  try {
    await extApi.post("/auth/logout");
    cookies().delete("accessToken");
    return { success: true, error: null };
  } catch (error: any) {
    cookies().delete("accessToken");
    console.log(error);
    return { success: false, error: error?.message };
  }
};

export const getUser = async () => {
  // make request
  try {
    const { data } = await extApi.get("/auth/me");
    const user = {
      fullName: data.fullName,
      firstName: data.firstName,
      lastName: data.lastName,
      isEmailVerified: data.isEmailVerified,
    };
    return { user, error: null };
  } catch (error: any) {
    console.log(error);
    return { user: null, error: error.message };
  }
};

export const EmailSignInAction = ac(
  LoginSchema,
  async ({ email, password }) => {
    // make query
    try {
      const res = await extApi.post("/auth/login", {
        email: email,
        password: password,
      });

      // Set token in the cookie
      const setCookieHdr = res?.headers["set-cookie"];

      if (setCookieHdr) {
        // Handle the case where setCookieHdr might be an array
        const cookiesHdr = Array.isArray(setCookieHdr)
          ? setCookieHdr
          : [setCookieHdr];
        const token = cookiesHdr[0].split(";")[0].split("=")[1];
        cookies().set({
          name: "accessToken",
          value: token,
          secure: true,
          httpOnly: true,
          expires: new Date(jwtDecode(token).exp! * 1000),
        });
        return {
          success: "Logged in successfully.",
          user: res.data,
        };
      }
      return redirect("/");
    } catch (error: any) {
      if (error.status === 404) {
        return { error: "Email does not exist. try registering instead!" };
      }
      if (error.status === 401) {
        return { error: "Email or password is incorrect" };
      }
    }
  },
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
        },
      );
      // Set token in the cookie
      const setCookieHdr = res?.headers["set-cookie"];

      if (setCookieHdr) {
        // Handle the case where setCookieHdr might be an array
        const cookiesHdr = Array.isArray(setCookieHdr)
          ? setCookieHdr
          : [setCookieHdr];
        const token = cookiesHdr[0].split(";")[0].split("=")[1];
        cookies().set({
          name: "accessToken",
          value: token,
          secure: true,
          httpOnly: true,
          expires: new Date(jwtDecode(token).exp! * 1000),
        });
        return {
          success: `Verification code has been sent on ${email}`,
        };
      }
      return redirect("/account");
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
  },
);

export const EmailVerificationAction = ac(
  EmailVerificationSchema,
  async ({ token }) => {
    try {
      await extApi.post(`/auth/verify-email?token=${token}`);
      return { success: "Email verified successfully." };
    } catch (error: any) {
      if (error.status === 400) return { error: error.message };
      return { error: "Link is invalid or expired." };
    }
  },
);

export const getUserAction = async (): Promise<GetUserSchema | undefined> => {
  try {
    const { data } = await extApi.get("/auth/me");
    return data;
  } catch (error: any) {
    return error.message;
  }
};

export const logoutUserAction = async () => {
  try {
    // make query
    await extApi.get("/auth/logout");
    cookies().delete("accessToken");
    return { success: "Logged out successfully." };
  } catch (error: any) {
    console.log(error);
    cookies().delete("accessToken");
    return error.message;
  }
};
