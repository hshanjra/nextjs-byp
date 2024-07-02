import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { checkoutOrderSchema } from "@/types/checkoutSchema";

// Define options for state and country dropdowns
const stateOptions = [
  { value: "NY", label: "New York" },
  { value: "CA", label: "California" },
  { value: "TX", label: "Texas" },
  // Add more states as needed
];

const countryOptions = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  // Add more countries as needed
];

export default function CheckoutForm() {
  const form = useForm({
    resolver: zodResolver(checkoutOrderSchema),
    defaultValues: {
      billingFirstName: "",
      billingLastName: "",
      billingCompanyName: "",
      billingPhone: "",
      billingStreetAddress: "",
      billingCity: "",
      billingState: "",
      billingZipCode: "",
      billingCountry: "",
      shippingSameAsBilling: true,
      shippingFirstName: "",
      shippingLastName: "",
      shippingCompanyName: "",
      shippingPhone: "",
      shippingStreetAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingZipCode: "",
      shippingCountry: "",
    },
  });

  const { control, watch, setValue } = form;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const watchShippingSameAsBilling = watch("shippingSameAsBilling");

  // Effect to copy billing address to shipping address if sameAsBilling is checked

  if (watchShippingSameAsBilling) {
    setValue("shippingFirstName", form.getValues("billingFirstName"));
    setValue("shippingLastName", form.getValues("billingLastName"));
    setValue("shippingCompanyName", form.getValues("billingCompanyName"));
    setValue("shippingPhone", form.getValues("billingPhone"));
    setValue("shippingStreetAddress", form.getValues("billingStreetAddress"));
    setValue("shippingCity", form.getValues("billingCity"));
    setValue("shippingState", form.getValues("billingState"));
    setValue("shippingZipCode", form.getValues("billingZipCode"));
    setValue("shippingCountry", form.getValues("billingCountry"));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex space-x-5 p-10 justify-center items-center"
      >
        <div>
          <h2>Billing Address</h2>
          <FormField
            control={control}
            name="billingFirstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder="First Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingLastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Last Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingCompanyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="ABC Corp" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="789654123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingStreetAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="billingCity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="City" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormControl>
            <Controller
              control={control}
              name="billingState"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <Select
                    {...field}
                    options={stateOptions}
                    placeholder="Select State"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormControl>

          <FormField
            control={control}
            name="billingZipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl>
                  <Input placeholder="Zip Code" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormControl>
            <Controller
              control={control}
              name="billingCountry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    {...field}
                    options={countryOptions}
                    placeholder="Select Country"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormControl>

          <FormControl>
            <FormItem>
              <Controller
                name="shippingSameAsBilling"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="shippingSameAsBilling"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <FormLabel> Shipping address same as billing</FormLabel>
              <FormMessage />
            </FormItem>
          </FormControl>

          {/* <FormField
            control={control}
            name="shippingSameAsBilling"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Controller
                    name="shippingSameAsBilling"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id="shippingSameAsBilling"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                </FormControl>
                <FormLabel htmlFor="shippingSameAsBilling">
                  Shipping address same as billing
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <Button type="submit">Submit</Button>
        </div>

        <div>
          {!watchShippingSameAsBilling && (
            <>
              <h2>Shipping Address</h2>
              <FormField
                control={control}
                name="shippingFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shippingLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shippingCompanyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC Corp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shippingPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="789654123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shippingStreetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Street Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="shippingCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="shippingState"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Select
                        {...field}
                        options={stateOptions}
                        placeholder="Select State"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="shippingZipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormControl>
                <Controller
                  control={control}
                  name="shippingCountry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select
                        {...field}
                        options={countryOptions}
                        placeholder="Select Country"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormControl>
            </>
          )}
        </div>
      </form>
    </Form>
  );
}
