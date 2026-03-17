"use client";

import { FC, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "next-auth/react";
import { LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import type { DefaultSession } from "next-auth";
import { motion } from "framer-motion";

type AuthUser = DefaultSession["user"];

interface Props {
  user: AuthUser;
}

const UserBox: FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const displayName = user?.name ?? user?.email ?? "User";
  const firstLetter = displayName?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild aria-label="user-profile">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div className="p-0.5 rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500">
              <Avatar className="cursor-pointer h-9 w-9 border-2 border-white dark:border-gray-900">
                <AvatarImage src={user?.image ?? undefined} alt={displayName} />
                <AvatarFallback className="capitalize bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-600 dark:text-purple-300 font-semibold">
                  {firstLetter}
                </AvatarFallback>
              </Avatar>
            </div>
          </motion.div>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 rounded-xl border border-gray-200 dark:border-gray-700 shadow-premium bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
          
          <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-gray-100 dark:focus:bg-gray-800">
            <Link href="/dashboard" className="flex items-center w-full">
              <LayoutDashboard className="w-4 h-4 mr-2 text-purple-500" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer rounded-lg focus:bg-gray-100 dark:focus:bg-gray-800">
            <Link href="/dashboard/settings" className="flex items-center w-full">
              <Settings className="w-4 h-4 mr-2 text-gray-500" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />
          
          <DropdownMenuItem
            className="cursor-pointer rounded-lg focus:bg-red-50 dark:focus:bg-red-900/20 text-red-600 dark:text-red-400"
            onClick={() => setOpen(true)}
          >
            <LogOut className="w-4 h-4 mr-2" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent className="max-w-md rounded-2xl border border-gray-200 dark:border-gray-700 shadow-premium">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Sign out?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-500 dark:text-gray-400">
              Are you sure you want to sign out of your account? You can always sign back in.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => signOut({ callbackUrl: "/sign-in" })}
              className="rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
            >
              Sign out
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UserBox;
