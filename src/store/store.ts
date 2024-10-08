"use client";
import { Store } from "@/types/store";
import { create } from "zustand";
import { createUserSlice } from "@/store/user-slice";
import { immer } from "zustand/middleware/immer";
import { createCartSlice } from "./cart-slice";
import { persist } from "zustand/middleware";
import { createVehicleSlice } from "./vehicle-store";

export const useStore = create<Store>()(
  persist(
    immer((...a) => ({
      // ...createUserSlice(...a),
      // ...createCartSlice(...a),
      ...createVehicleSlice(...a),
    })),
    { name: "_s" },
  ),
);

// export const userStore = create(persist(createUserSlice, { name: "user" }));
