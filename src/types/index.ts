export type User = {
  fullName: string;
  firstName: string;
  lastName: string;
  isEmailVerified: boolean;
};

export type CompatibleMetadata = {
  make: string;
  models: {
    name: string;
    subModels: string[];
  }[];
  years: number[];
};
