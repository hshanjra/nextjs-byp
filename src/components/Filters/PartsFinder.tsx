"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { useEffect, useState } from "react";
import SubmitButton from "../SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { getCompatibleMetadata } from "@/actions/ProductsAction";
import { Loader2, Search, Trash2 } from "lucide-react";
import { useStore } from "@/store/store";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";

// Zod validation schema
const vehicleFilterSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.string(),
  subModel: z.string(),
});

export default function PartsFinder() {
  // Store vehicle in store
  const { setVehicle, getVehicle, removeVehicle } = useStore();
  // Extract vehicle from store
  const { make, model, year, subModel } = getVehicle();

  const router = useRouter();
  const pathname = usePathname();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch compatibility metadata
  const { data: metadata, isPending } = useQuery({
    queryKey: ["metadata"],
    queryFn: () => getCompatibleMetadata(),
  });

  const vehicleFilterForm = useForm({
    resolver: zodResolver(vehicleFilterSchema),
    defaultValues: {
      make: "",
      model: "",
      year: "",
      subModel: "",
    },
  });

  const [selectedMake, selectedModel, selectedYear, selectedSubModel] =
    vehicleFilterForm.watch(["make", "model", "year", "subModel"]);

  const getModels = () => {
    const make = metadata?.find((v) => v.make === selectedMake);
    return make ? make.models : [];
  };

  const getSubModels = () => {
    const models = getModels();
    const model = models.find((m) => m.name === selectedModel);
    return model ? model.subModels : [];
  };

  useEffect(() => {
    vehicleFilterForm.reset({
      make: selectedMake,
      model: "",
      year: "",
      subModel: "",
    });
  }, [selectedMake, vehicleFilterForm]);

  const onSubmit = (values: z.infer<typeof vehicleFilterSchema>) => {
    setIsLoading(true);
    setVehicle({
      make: values.make,
      model: values.model,
      year: values.year,
      subModel: values.subModel,
    });

    if (pathname !== "/find-parts") {
      // Redirect to parts finder page
      router.push("/find-parts", {
        scroll: true,
      });
    }

    setIsLoading(false);
  };

  // Set button disabled till all fields are not filled
  const disabled =
    !selectedMake || !selectedModel || !selectedYear || !selectedSubModel;

  // Check if vehicle is exists in store
  const isVehicleExists = make && model && year && subModel;

  return (
    <div className="relative">
      <h4 className="text-base font-bold">Find the Right Parts Faster</h4>
      <p className="my-5 text-xs text-gray-400">
        Having the right automotive parts and car accessories will help you to
        boost your travel comfort and go on the long-distance journey
        comfortably that you have been planning.
      </p>

      {/* Show selected vehicle */}
      {isVehicleExists && (
        <div className="my-5 flex w-full flex-col items-center justify-center rounded-xl border border-gray-200 p-5">
          <p className="text-base font-medium">Selected Vehicle</p>
          <div className="flex items-center justify-between">
            <p className="text-center text-base font-semibold text-gray-500">
              {make} {model} {year} {subModel}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant={"success"}
              size={"sm"}
              className="my-2 flex items-center gap-x-1 rounded-xl text-sm"
              onClick={() => router.push("/find-parts")}
            >
              <Search className="size-4" />
              <span>Find parts</span>
            </Button>
            <Button
              type="button"
              variant={"destructive"}
              size={"sm"}
              className="my-2 flex items-center gap-x-1 rounded-xl text-sm"
              onClick={removeVehicle}
            >
              <Trash2 className="size-4" />
              <span>Remove</span>
            </Button>
          </div>
        </div>
      )}

      <Form {...vehicleFilterForm}>
        <form
          onSubmit={vehicleFilterForm.handleSubmit(onSubmit)}
          className="space-y-3"
        >
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="make"
            placeholder="Select Make"
          >
            {isPending ? (
              <div className="flex h-24 items-center justify-center">
                <Loader2
                  className="animate-spin text-primary duration-500"
                  size={30}
                />
              </div>
            ) : (
              metadata?.map((vehicle) => (
                <SelectItem key={vehicle.make} value={vehicle.make}>
                  <p>{vehicle.make}</p>
                </SelectItem>
              ))
            )}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="model"
            placeholder="Select Model"
            disabled={!selectedMake}
          >
            {getModels().map((model) => (
              <SelectItem key={model.name} value={model.name}>
                {model.name}
              </SelectItem>
            ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="year"
            placeholder="Select Year"
            disabled={!selectedModel}
          >
            {metadata
              ?.find((v) => v.make === selectedMake)
              ?.years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
          </CustomFormField>
          <CustomFormField
            fieldType={FormFieldType.SELECT}
            control={vehicleFilterForm.control}
            name="subModel"
            placeholder="Select Sub Model"
            disabled={!selectedModel}
          >
            {getSubModels().map((bodyStyle) => (
              <SelectItem key={bodyStyle} value={bodyStyle}>
                {bodyStyle}
              </SelectItem>
            ))}
          </CustomFormField>

          <SubmitButton
            isLoading={isLoading}
            className="w-full font-bold"
            disabled={disabled}
          >
            Find Auto Parts
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
