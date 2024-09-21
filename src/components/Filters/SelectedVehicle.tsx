"use client";

import { useStore } from "@/store/store";
import { CarFront } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Separator } from "../ui/separator";
import { useRouter } from "next/navigation";
import PartsFinder from "../Header/PartsFinder";
import { cn } from "@/lib/utils";

export default function SelectedVehicle() {
  const { getVehicle, removeVehicle } = useStore();
  // Extract vehicle from store
  const { make, model, year, subModel } = getVehicle();

  const router = useRouter();

  // Check if vehicle is exists in store
  const isVehicleExists = make && model && year && subModel;

  const handleReset = () => {
    // Reset vehicle
    removeVehicle();
    // Redirect to products page
    router.push("/products");
  };

  return (
    <section className="grid items-end rounded-xl border bg-zinc-100/50 p-10 sm:grid-cols-2">
      <div>
        <h2 className="mb-5 text-base font-bold uppercase text-gray-500">
          Currently Shopping for:
        </h2>
        {/* Selected Vehicle */}
        <div className="flex max-w-md items-center gap-3 rounded-xl border border-l-4 border-l-primary bg-white p-5 shadow-md">
          <CarFront className="size-10 text-primary" />
          <h3 className="font-roboto text-base font-medium text-gray-600">
            {isVehicleExists ? (
              `${make} ${model} ${year} ${subModel}`
            ) : (
              <b className="text-gray-400">No Vehicle Selected</b>
            )}
          </h3>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="max-w-sm">
          <p className="text-base font-normal text-zinc-900">
            We will filter your search based on your selected vehicle. You can
            change the vehicle at any time.
          </p>
          {/* buttons */}
          <div className="mt-1 flex items-center justify-evenly">
            <PartsFinder
              trigger={
                <>
                  <span
                    className={cn(
                      "!text-base !text-zinc-900",
                      buttonVariants({ variant: "link" }),
                    )}
                  >
                    Change Vehicle
                  </span>
                </>
              }
            />
            <Separator orientation="vertical" className="h-5 text-zinc-900" />
            <Button
              type="button"
              variant={"link"}
              className="pl-0 text-base text-zinc-900"
              onClick={handleReset}
            >
              Shop Without Vehicle
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
