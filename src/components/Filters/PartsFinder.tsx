"use client";

import { VEHICLE_ATTRIBUTES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { SelectItem } from "../ui/select";
import { useEffect } from "react";
import SubmitButton from "../SubmitButton";
import { useQuery } from "@tanstack/react-query";
import { getCompatibleMetadata } from "@/actions/ProductsAction";
import { Loader2 } from "lucide-react";

// Zod validation schema
const vehicleFilterSchema = z.object({
  make: z.string(),
  model: z.string(),
  year: z.string(),
  subModel: z.string(),
});

export default function PartsFinder() {
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

  const [selectedMake, selectedModel] = vehicleFilterForm.watch([
    "make",
    "model",
  ]);

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
    // TODO: Set make model year in redux store
    console.log(values);
  };

  return (
    <div className="relative">
      <h4 className="text-base font-bold">Find the Right Parts Faster</h4>
      <p className="my-5 text-xs text-gray-400">
        Having the right automotive parts and car accessories will help you to
        boost your travel comfort and go on the long-distance journey
        comfortably that you have been planning.
      </p>

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

          <SubmitButton isLoading={false} className="w-full font-bold">
            Find Auto Parts
          </SubmitButton>
        </form>
      </Form>
    </div>
  );
}
