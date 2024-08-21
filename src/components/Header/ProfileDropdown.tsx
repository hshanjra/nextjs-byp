"use client";
import {
  BookUser,
  Box,
  ChevronDown,
  Heart,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import AuthSidebar from "./AuthSidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { logoutUserAction } from "@/actions/AuthAction";
import { useStore } from "@/store/store";
import useAuthUser from "@/hooks/useAuthUser";
import { useRouter } from "next/navigation";

const ProfileDropDown = () => {
  const user = useAuthUser();
  const reset = useStore((state) => state.reset);

  const router = useRouter();

  if (!user) {
    return (
      <div className="group relative z-20 flex cursor-pointer flex-col">
        <div className="flex items-center justify-between space-x-2">
          <h6>My Account</h6>
          <ChevronDown className="h-4 w-4" />
        </div>
        <span className="text-xs">Hello, Sign In</span>

        <div className="absolute right-0 top-10 hidden group-hover:block">
          <Card className="w-[290px] bg-white shadow-md">
            <CardContent className="space-y-3 py-2">
              <span className="text-center text-sm">
                Sign up now and enjoy discounted shopping!
              </span>
              {/* Sidebar Login/Register Form */}
              <AuthSidebar />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="group relative z-20 flex cursor-pointer flex-col">
          <div className="flex items-center justify-between space-x-2">
            <h6>My Account</h6>
            <ChevronDown className="h-4 w-4" />
          </div>
          <span className="text-xs capitalize">Hello, {user.firstName}</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => router.push("/account/orders")}>
            <Box className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/account/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/account/addresses")}>
            <BookUser className="mr-2 h-4 w-4" />
            <span>Addresses</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => router.push("/account/wishlist")}>
            <Heart className="mr-2 h-4 w-4" />
            <span>Wishlist</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            await logoutUserAction();
            reset();
            window.location.reload();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropDown;
