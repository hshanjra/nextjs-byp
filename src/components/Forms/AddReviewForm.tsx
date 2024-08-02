"use client";

import { AddReviewSchema, addReviewSchema } from "@/types/reviewSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormContext } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Separator } from "../ui/separator";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

interface RatingProps {
  name: string;
  control: any;
}

export default function AddReviewForm() {
  const form = useForm({
    resolver: zodResolver(addReviewSchema),
    defaultValues: {
      rating: 0,
      comment: "",
    },
  });

  const handleFormSubmit = async (values: AddReviewSchema) => {
    console.log("values", values);
  };

  const allowedLength = 250;
  const comment = form.watch("comment");
  const lengthLeft = 250 - comment.length;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="my-10">
        <h3 className="text-lg">Add a review</h3>
        <Separator />
        <div className="my-5 space-y-5">
          <div className="space-y-1">
            <Label
              htmlFor="rating"
              className={form.formState.errors.rating ? "text-red-500" : ""}
            >
              Select Rating*
            </Label>
            <Rating name="rating" control={form.control} />
          </div>

          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            name="comment"
            control={form.control}
            label="Comment*"
            placeholder="Loved it!"
            maxLength={allowedLength}
          />
          <span className="text-sm">
            <p className="text-right mt-2">
              Characters left: {lengthLeft}/{allowedLength}
            </p>
          </span>
        </div>

        <Button type="submit" variant={"dark"} className="h-11 w-full lg:w-56">
          Add review
        </Button>
      </form>
    </Form>
  );
}

const Rating: React.FC<RatingProps> = ({ name, control }) => {
  const { watch } = useFormContext();
  const selectedRating = watch(name);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          <div className="flex space-x-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                className="flex items-center space-x-1 cursor-pointer"
              >
                <input
                  type="radio"
                  value={value}
                  checked={field.value === value}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="hidden"
                />
                <Star
                  className={cn("h-6 w-6", {
                    "text-yellow-400 fill-yellow-400": value <= selectedRating,
                    "text-gray-300": value > selectedRating,
                  })}
                />
              </label>
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
