"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader, Camera, User as UserIcon, Mail, Phone } from "lucide-react";
import FullNameForm from "./full-name.form";
import EmailForm from "./email.form";
import { IUser } from "@/types";
import { FC, useState } from "react";
import { UploadDropzone } from "@/lib/uploadthing";
import useAction from "@/hooks/use-action";
import { updateUser } from "@/actions/user.action";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import PhoneForm from "./phone.form";
import { motion } from "framer-motion";

interface Props {
  user: IUser;
}

const EditInformation: FC<Props> = ({ user }) => {
  const [open, setOpen] = useState(false);

  const { update } = useSession();
  const { isLoading, onError, setIsLoading } = useAction();

  const onUpdateAvatar = async (avatar: string, avatarKey: string) => {
    setIsLoading(true);
    const res = await updateUser({ avatar, avatarKey });
    if (res?.serverError || res?.validationErrors || !res?.data) {
      return onError("Something went wrong");
    }
    if (res.data.failure) {
      return onError(res.data.failure);
    }
    if (res.data.status === 200) {
      toast({ description: "Avatar updated successfully" });
      update();
      setOpen(false);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-premium overflow-hidden">
      {/* Profile Header with Avatar */}
      <div className="relative h-32 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        </div>
      </div>

      {/* Avatar Section */}
      <div className="relative px-6 pb-6">
        <div className="relative -mt-16 flex justify-center">
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 z-50 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <Loader className="w-8 h-8 animate-spin text-purple-500" />
                </div>
              </div>
            )}
            
            {/* Avatar with gradient ring */}
            <div className="p-1 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full">
              <Avatar className="w-28 h-28 border-4 border-white dark:border-gray-900">
                <AvatarImage src={user.image} alt={user.name} />
                <AvatarFallback className="bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 text-purple-600 dark:text-purple-300 text-4xl font-bold">
                  {user.fullName?.charAt(0)?.toUpperCase() ?? "U"}
                </AvatarFallback>
              </Avatar>
            </div>

            {/* Edit Avatar Button */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <motion.button
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Camera className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                </motion.button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Update Avatar</DialogTitle>
                </DialogHeader>
                <UploadDropzone
                  endpoint={"imageUploader"}
                  config={{ appendOnPaste: true, mode: "auto" }}
                  appearance={{ container: { height: 200, padding: 10 } }}
                  onClientUploadComplete={(res) =>
                    onUpdateAvatar(res[0].url, res[0].key)
                  }
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* User Name */}
        <div className="text-center mt-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            {user.fullName || "User"}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>
      </div>

      {/* Information Accordion */}
      <div className="px-6 pb-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-1">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Full Name</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.name || "Not set"}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <FullNameForm user={user} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Email</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.email || "Not set"}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <EmailForm user={user} />
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-white dark:hover:bg-gray-800 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">Phone</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user.phone || "Not set"}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                  <PhoneForm user={user} />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default EditInformation;
