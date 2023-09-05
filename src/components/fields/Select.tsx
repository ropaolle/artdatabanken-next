"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { InputHTMLAttributes, ReactNode } from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";

type SelectOption = {
  value: string;
  label?: ReactNode;
  data?: unknown;
};

type InputProps<TName> = {
  name: TName;
  label?: string;
  description?: string;
  vertical?: boolean;
  options: SelectOption[];
} & InputHTMLAttributes<HTMLInputElement>;

export default function Select<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, vertical, options = [], placeholder }: InputProps<TName>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ref, ...fieldProps } }) => {
        return (
          <FormItem className={cn(vertical && "flex flex-wrap")}>
            <FormLabel className={cn(vertical && "basis-[25%] self-center")}>{label || name}</FormLabel>
            <SelectComponent
              onValueChange={(value) => {
                onChange(value);
              }}
              defaultValue={value}
              {...fieldProps}
            >
              <FormControl>
                <SelectTrigger className={cn(vertical && "basis-[75%]")}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {options.map(({ label, value }, i) => (
                  //
                  <SelectItem key={i} value={value}>
                    {label || value}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectComponent>
            <FormDescription className={cn(vertical && "mt-0 basis-full text-right")}>{description}</FormDescription>
            <FormMessage className={cn(vertical && "mt-0 basis-full text-right font-normal")} />
          </FormItem>
        );
      }}
    />
  );
}
