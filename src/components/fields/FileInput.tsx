"use client";

import { InputHTMLAttributes, useCallback, useRef, useState, useId } from "react";
import { useFormContext, type FieldPath, type FieldValues, useController } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type InputProps<TName> = {
  name: TName;
  label?: string;
  description?: string;
  vertical?: boolean;
  // setState: (files: FileList | null) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export default function FileInput<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, vertical /* , setState */, ...props }: InputProps<TName>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { value, onChange, ...fieldProps } }) => {
        return (
          <FormItem className={cn(vertical && "flex flex-wrap")}>
            <FormLabel className={cn(vertical && "basis-[25%] self-center")}>{label || name}</FormLabel>
            <FormControl>
              <Input
                type="file"
                {...fieldProps}
                {...props}
                onChange={(e) => {
                  // TODO: SetState is not a good whay to handle state to parent
                  // if (typeof setState === "function") {
                  //   setState(e.target.files);
                  // }
                  onChange(e.target.files);
                }}
              />
            </FormControl>
            <FormDescription className={cn(vertical && "mt-0 basis-full text-right")}>{description}</FormDescription>
            <FormMessage className={cn(vertical && "mt-0 basis-full text-right font-normal")} />
          </FormItem>
        );
      }}
    />
  );
}
