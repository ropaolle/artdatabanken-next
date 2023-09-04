"use client";

import { InputHTMLAttributes, ReactNode, useContext } from "react";
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

type SelectOption<TData> = {
  value: string;
  label?: ReactNode;
  data?: TData;
};

type InputProps<TName, TData> = {
  name: TName;
  label?: string;
  description?: string;
  vertical?: boolean;
  options: SelectOption<TData>[];
  // setState: (value: TData) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function getData<TData>(options: SelectOption<TData>[], value: string) {
  return options.find((option) => option.value === value)?.data || ({} as TData);
}

export default function Select<
  TData,
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, vertical, options = [], placeholder/* , setState */ }: InputProps<TName, TData>) {
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
                // TODO: SetState is not a good whay to handle state to parent
                // olle(getData(options, value))
                // if (typeof setState === "function") {
                //   setState(getData(options, value));
                // }
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
