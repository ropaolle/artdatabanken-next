"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input as InputComponent } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";

type InputProps<TName> = {
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  vertical?: boolean;
};

export default function Input<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, placeholder, description, vertical }: InputProps<TName>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(vertical && "flex flex-wrap")}>
          <FormLabel className={cn(vertical && "basis-[25%] self-center")}>{label || name}</FormLabel>
          <FormControl>
            <InputComponent placeholder={placeholder} {...field} className={cn(vertical && "basis-[75%]")} />
          </FormControl>
          <FormDescription className={cn(vertical && "mt-0 basis-full text-right")}>{description}</FormDescription>
          <FormMessage className={cn(vertical && "mt-0 basis-full text-right font-normal")} />
        </FormItem>
      )}
    />
  );
}
