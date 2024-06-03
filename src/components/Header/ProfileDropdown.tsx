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

export default function ProfileDropdown() {
  const user = true;

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex flex-col cursor-pointer group relative z-20">
          <div className="flex justify-between items-center space-x-2">
            <h6>My Account</h6>
            <ChevronDown className="h-4 w-4" />
          </div>
          <span className="text-xs capitalize">Hello, Alex</span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Box className="mr-2 h-4 w-4" />
            <span>Orders</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BookUser className="mr-2 h-4 w-4" />
            <span>Addresses</span>
          </DropdownMenuItem>
          <Link href="/wishlist" className="cursor-pointer">
            <DropdownMenuItem>
              <Heart className="mr-2 h-4 w-4" />
              <span>Wishlist</span>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <div className="flex flex-col cursor-pointer group relative z-20">
      <div className="flex justify-between items-center space-x-2">
        <h6>My Account</h6>
        <ChevronDown className="h-4 w-4" />
      </div>
      <span className="text-xs">Hello, Sign In</span>

      <div className="absolute hidden top-10 right-0 group-hover:block">
        <Card className="shadow-md w-[290px] bg-white">
          <CardContent className="py-2 space-y-3">
            <span className="text-sm text-center">
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
