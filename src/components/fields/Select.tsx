"use client";

import { InputHTMLAttributes } from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type InputProps<TName> = {
  name: TName;
  label?: string;
  description?: string;
  vertical?: boolean;
  items: { label: string; value: string }[];
  setState: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Select<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, vertical, items = [], placeholder, setState }: InputProps<TName>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ref, ...fieldProps } }) => (
        <FormItem className={cn(vertical && "flex flex-wrap")}>
          <FormLabel className={cn(vertical && "basis-[25%] self-center")}>{label || name}</FormLabel>
          <SelectComponent
            onValueChange={(e) => {
              if (typeof setState === "function") setState(e);
              onChange(e);
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
              {items.map(({ label, value }, i) => (
                <SelectItem key={i} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectComponent>
          <FormDescription className={cn(vertical && "mt-0 basis-full text-right")}>{description}</FormDescription>
          <FormMessage className={cn(vertical && "mt-0 basis-full text-right font-normal")} />
        </FormItem>
      )}
    />
  );
}
