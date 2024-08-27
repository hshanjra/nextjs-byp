import Breadcrumb from "@/components/Breadcrumb";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectGroup } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SITE_METADATA } from "@/constants";
import { Upload } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Profile Settings | ${SITE_METADATA.title}`,
  description: "Profile Settings",
};

export default function ProfilePage() {
  return (
    <MaxWidthWrapper className="my-5">
      <Breadcrumb />

      <h2 className="lead-10 my-5 mb-5 text-3xl font-extrabold text-black">
        Profile Settings
      </h2>

      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
            <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
              <h3 className="font-medium text-black dark:text-white">
                Personal Information
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div>
                  <div className="gap-5.5 mb-5 flex flex-col gap-4 sm:flex-row">
                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Full Name
                      </label>
                      <Input
                        id="fname"
                        value="Devid Jhon"
                        className="col-span-3 mt-2"
                        placeholder="Enter Full Name"
                      />
                    </div>

                    <div className="w-full sm:w-1/2">
                      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                        Last Name
                      </label>
                      <Input
                        id="lname"
                        className="col-span-3 mt-2"
                        placeholder="Sharma"
                        value="Sharma"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Display Name
                    </label>
                    <Input
                      id="displayName"
                      className="col-span-3 mt-2"
                      placeholder="bandunirajni"
                      value="bandunirajni"
                    />
                    <span className="text-sm text-gray-400">
                      This will be how your name will be displayed in the
                      account section and in reviews
                    </span>
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Email Address
                    </label>
                    <Input
                      id="emailAddress"
                      className="col-span-3 mt-2"
                      placeholder="test@gmail.com"
                      value="test@gmail.com"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      Phone Number
                    </label>
                    <Input
                      id="phoneNumber"
                      className="col-span-3 mt-2"
                      placeholder="+990 3343 7865"
                      value="+990 3343 7865"
                    />
                  </div>

                  <div className="mb-5">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                      BIO
                    </label>
                    <Textarea
                      placeholder="Type your message here."
                      id="message"
                      value="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel vero excepturi deleniti sit, doloremque quibusdam, veniam optio necessitatibus numquam officiis odit eveniet? Perferendis et obcaecati quidem. Amet doloribus quasi quaerat!"
                    />
                  </div>

                  <div className="gap-4.5 flex justify-end gap-4">
                    <button
                      className="border-stroke hover:shadow-1 dark:border-strokedark flex justify-center rounded border px-6 py-2 font-medium text-black dark:text-white"
                      type="submit"
                    >
                      Cancel
                    </button>
                    <button
                      className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                      type="submit"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <h2 className="mb-10 text-3xl font-bold">Password change</h2>

                  <div className="space-y-4">
                    <SelectGroup>
                      <Label>Current Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </SelectGroup>

                    <SelectGroup>
                      <Label>New Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </SelectGroup>

                    <SelectGroup>
                      <Label>Confirm Password</Label>
                      <Input
                        id="current_password"
                        type="password"
                        autoComplete="current-password"
                      />
                    </SelectGroup>

                    <div className="gap-4.5 flex justify-end gap-4">
                      <button
                        className="border-stroke hover:shadow-1 dark:border-strokedark flex justify-center rounded border px-6 py-2 font-medium text-black dark:text-white"
                        type="submit"
                      >
                        Cancel
                      </button>
                      <button
                        className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                        type="submit"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="col-span-5 xl:col-span-2">
          <div className="border-stroke shadow-default dark:border-strokedark dark:bg-boxdark rounded-sm border bg-white">
            <div className="border-stroke dark:border-strokedark border-b px-7 py-4">
              <h3 className="font-medium text-black dark:text-white">
                Update Prfile Picture
              </h3>
            </div>
            <div className="p-7">
              <form action="#">
                <div className="mb-4 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="mb-1.5 font-medium text-black dark:text-white">
                      Edit your photo
                    </span>
                    <span className="flex gap-2.5">
                      <button className="text-sm font-medium hover:text-primary">
                        Delete
                      </button>
                      <button className="text-sm font-medium hover:text-primary">
                        Update
                      </button>
                    </span>
                  </div>
                </div>

                <div
                  id="FileUpload"
                  className="bg-gray dark:bg-meta-4 sm:py-7.5 relative mb-5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary px-4 py-4"
                >
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                  />
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <span className="border-stroke dark:border-strokedark dark:bg-boxdark flex h-10 w-10 items-center justify-center rounded-full border bg-white">
                      <Upload className="h-5 w-5" />
                    </span>
                    <p className="text-sm font-medium">
                      <span className="mr-2 text-primary">Click to upload</span>
                      or drag and drop
                    </p>
                    <p className="mt-1.5 text-sm font-medium">
                      SVG, PNG, JPG or GIF
                    </p>
                    <p className="text-sm font-medium">(max, 800 X 800px)</p>
                  </div>
                </div>
                {/* Profile Pic Uploder Need to be change according go nNEXT JS */}

                <div className="flex justify-end gap-4">
                  <button
                    className="border-stroke hover:shadow-1 flex justify-center rounded border px-6 py-2 font-medium text-black hover:border-primary-foreground hover:bg-primary-foreground"
                    type="submit"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-white hover:bg-opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
