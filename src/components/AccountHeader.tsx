"use client";

import { Button } from "./ui/button";
import { useAuth } from "@/providers/AuthProvider";

export default function AccountHeader() {
  const { currentUser: user, handleLogout } = useAuth();
  return (
    <div className="flex items-center justify-between">
      <h3 className="my-5 text-xl font-semibold">
        {user ? `${user.firstName} ${user.lastName}'s ` : "Your "}
        Account
      </h3>
      <Button
        variant="link"
        onClick={async () => {
          await handleLogout();
          window.location.reload();
        }}
      >
        Log Out
      </Button>
    </div>
  );
}
