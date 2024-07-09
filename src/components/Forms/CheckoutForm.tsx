"use client";

import { checkoutFormSchema, checkoutFormType } from "@/types/checkoutSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useController } from "react-hook-form";
import { CheckoutFormDefaultValues, US_STATES } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import MaxWidthWrapper from "../MaxWidthWrapper";
import SubmitButton from "../SubmitButton";
import { SelectItem } from "../ui/select";
import { motion } from "framer-motion";
import { fetchCityAndState } from "@/actions/ZipCodeAction";
import { Input } from "../ui/input";

export default function CheckoutForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [zipCodeProcessing, setZipCodeProcessing] = useState(false);

  const form = useForm<checkoutFormType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: CheckoutFormDefaultValues,
  });

  const onSubmit = async (values: checkoutFormType) => {
    setIsLoading(true);

    // TODO: Submit Form
    console.log("values", values);

    setIsLoading(false);
  };

  const isSame = form.watch("shippingSameAsBilling");

  useEffect(() => {
    const resetShippingFields = () => {
      form.resetField("shippingZipCode");
      form.resetField("shippingFirstName");
      form.resetField("shippingLastName");
      form.resetField("shippingCompanyName");
      form.resetField("shippingPhone");
      form.resetField("shippingStreetAddress");
      form.resetField("shippingCity");
      // form.resetField("shippingState");
    };

    if (!isSame) {
      resetShippingFields();
    }
  }, [isSame, form]);

  if (isSame) {
    form.setValue("shippingFirstName", form.watch("billingFirstName"));
    form.setValue("shippingLastName", form.watch("billingLastName"));
    form.setValue("shippingCompanyName", form.watch("billingCompanyName"));
    form.setValue("shippingPhone", form.watch("billingPhone"));
    form.setValue("shippingStreetAddress", form.watch("billingStreetAddress"));
    form.setValue("shippingCity", form.watch("billingCity"));
    form.setValue("shippingState", form.watch("billingState"));
    form.setValue("shippingZipCode", form.watch("billingZipCode"));
  }

  const handleZipChange = async (zipCode: string, isBilling = true) => {
    const fieldPrefix = isBilling ? "billing" : "shipping";
    form.setValue(`${fieldPrefix}ZipCode`, zipCode);
    if (zipCode && zipCode.length >= 5) {
      setZipCodeProcessing(true);
      try {
        const { city, state, error } = await fetchCityAndState(zipCode);

        if (error) {
          form.setError(`${fieldPrefix}ZipCode`, { message: error });
          if (!isBilling) {
            form.setValue("shippingCity", "");
            form.setValue("shippingState", "");
          }
        } else {
          form.setValue(`${fieldPrefix}City`, city);
          form.setValue(`${fieldPrefix}State`, state);
          // form.control._defaultValues.billingState == state;
        }
        form.setValue(`${fieldPrefix}ZipCode`, zipCode);
      } catch (e) {
        form.setError(`${fieldPrefix}ZipCode`, {
          message: "An unexpected error occurred",
        });
        setZipCodeProcessing(false);
      } finally {
        setZipCodeProcessing(false);
      }
    }
  };

  return (
    <MaxWidthWrapper className="my-10 border rounded-xl p-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-6"
        >
          <motion.div animate={{ transition: { duration: 1 } }}>
            <section className="mb-7 space-y-4">
              <h1 className="text-xl font-bold md:text-2xl">Billing Details</h1>
              <p className="text-dark-700">
                Fill this form to complete your order.
              </p>
            </section>

            {/* Billing Form Fields */}
            <section className="space-y-4">
              {/* EMAIL & PHONE */}
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="billingFirstName"
                  label="First Name"
                  placeholder="Enter first name"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="billingLastName"
                  label="Last Name"
                  placeholder="Enter last name"
                />
              </div>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="billingCompanyName"
                label="Company Name (Optional)"
                placeholder="Stark Industries"
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name="billingStreetAddress"
                label="Street Address"
                placeholder="ex. 123 Main St"
              />
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.PHONE_INPUT}
                  control={form.control}
                  name="billingPhone"
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="billingCity"
                  label="City"
                  placeholder="Enter city"
                />
              </div>

              {/* Zip Code / State */}
              <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                  fieldType={FormFieldType.SELECT}
                  control={form.control}
                  name="billingState"
                  label="State"
                  placeholder="Select a state"
                >
                  {US_STATES.map((state, i) => (
                    <SelectItem key={i} value={state}>
                      <p>{state}</p>
                    </SelectItem>
                  ))}
                </CustomFormField>

                <CustomFormField
                  fieldType={FormFieldType.SKELETON}
                  control={form.control}
                  name="billingZipCode"
                  label="ZIP Code"
                  renderSkeleton={() => (
                    <div className="flex rounded-md border border-zinc-500">
                      <FormControl>
                        <Input
                          onChange={(e) =>
                            handleZipChange(e.target.value, true)
                          }
                          placeholder="ex. 12345"
                          maxLength={5}
                          disabled={zipCodeProcessing}
                          className="placeholder:text-zinc-400 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                        />
                      </FormControl>
                    </div>
                  )}
                />
              </div>

              <CustomFormField
                fieldType={FormFieldType.CHECKBOX}
                control={form.control}
                name="shippingSameAsBilling"
                label="Shipping and billing information are the same"
              />
            </section>
          </motion.div>

          {/* Shipping Form Fields */}
          {!isSame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { duration: 1 } }}
            >
              <section className="mb-7 space-y-4">
                <h1 className="text-xl font-bold md:text-2xl">
                  Shipping Details
                </h1>
              </section>

              <section className="space-y-4">
                {/* EMAIL & PHONE */}
                <div className="flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="shippingFirstName"
                    label="First Name"
                    placeholder="Enter first name"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="shippingLastName"
                    label="Last Name"
                    placeholder="Enter last name"
                  />
                </div>
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="shippingCompanyName"
                  label="Company Name (Optional)"
                  placeholder="Stark Industries"
                />
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="shippingStreetAddress"
                  label="Street Address"
                  placeholder="ex. 123 Main St"
                />
                <div className="flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="shippingPhone"
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="shippingCity"
                    label="City"
                    placeholder="Enter city"
                  />
                </div>
                {/* Zip Code / State */}

                <div className="flex flex-col gap-6 xl:flex-row">
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="shippingState"
                    label="State"
                    placeholder="Select a state"
                  >
                    {US_STATES.map((state, i) => (
                      <SelectItem key={i} value={state}>
                        <p>{state}</p>
                      </SelectItem>
                    ))}
                  </CustomFormField>

                  <CustomFormField
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="shippingZipCode"
                    label="ZIP Code"
                    renderSkeleton={() => (
                      <div className="flex rounded-md border border-zinc-500">
                        <FormControl>
                          <Input
                            onChange={(e) =>
                              handleZipChange(e.target.value, false)
                            }
                            disabled={zipCodeProcessing}
                            placeholder="ex. 12345"
                            maxLength={5}
                            className="placeholder:text-zinc-400 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
                          />
                        </FormControl>
                      </div>
                    )}
                  />
                </div>
              </section>
            </motion.div>
          )}

          <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
        </form>
      </Form>
    </MaxWidthWrapper>
  );
}
