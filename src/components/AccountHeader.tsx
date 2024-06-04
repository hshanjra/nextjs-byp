"use client";
import useAuthUser from "@/hooks/useAuthUser";
import { Button } from "./ui/button";
import { logoutUserAction } from "@/actions/AuthAction";

export default function AccountHeader() {
  const { userData, error, isLoading } = useAuthUser();
  return (
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold my-5">
        {userData ? `${userData.firstName}" "${userData.lastName}'s` : "Your"}{" "}
        Account
      </h3>
      <Button
        variant="link"
        onClick={async () => {
          await logoutUserAction();
          window.location.reload();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
