"use client";
import useAuthUser from "@/hooks/useAuthUser";

export default function AccountHeader() {
  const { userData, error, isLoading } = useAuthUser();
  return (
    <h3 className="text-xl font-semibold my-5">
      {userData ? `${userData.lastName}'s` : "Your"} Account
    </h3>
  );
}
