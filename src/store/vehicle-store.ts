import { StateCreator } from "zustand";

export type Vehicle = {
  make: string | undefined;
  model: string | undefined;
  year: string | undefined;
  subModel: string | undefined;
};

export type VehicleActions = {
  setVehicle: (vehicle: Vehicle) => void;
  getVehicle: () => Vehicle;
  removeVehicle: () => void;
};

export type VehicleSlice = Vehicle & VehicleActions;

export const createVehicleSlice: StateCreator<
  VehicleSlice,
  [["zustand/immer", never]],
  [],
  VehicleSlice
> = (set, get) => ({
  make: undefined,
  model: undefined,
  year: undefined,
  subModel: undefined,
  setVehicle: (vehicle: Vehicle) =>
    set((state) => {
      state.make = vehicle.make;
      state.model = vehicle.model;
      state.year = vehicle.year;
      state.subModel = vehicle.subModel;
    }),
  getVehicle: () => get(),
  removeVehicle: () =>
    set({
      make: undefined,
      model: undefined,
      year: undefined,
      subModel: undefined,
    }),
});
