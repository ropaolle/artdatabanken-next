"use client";

import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { type FieldPathByValue, type FieldValues, type UseControllerProps } from "react-hook-form";

type Item = { label: string; id: string };

type CheckboxProps = {
  label?: string;
  description?: string;
  items: readonly Item[];
};

type FieldType = string[];

export default function Checkboxes<
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, FieldType>,
>({ control, name, label, description, items }: UseControllerProps<TFieldValues, TName> & CheckboxProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="text-base">{label}</FormLabel>
            {description && <FormDescription>{description}</FormDescription>}
          </div>
          {items.map((item) => (
            <FormField
              key={item.id}
              control={control}
              name={name}
              render={({ field }) => {
                return (
                  <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(field.value?.filter((value: string) => value !== item.id));
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
