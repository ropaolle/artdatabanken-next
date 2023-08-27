"use client";

import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, type FieldPathByValue, type FieldValues, type UseControllerProps } from "react-hook-form";

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
>({ /* control,  */ name, label, description, items }: UseControllerProps<TFieldValues, TName> & CheckboxProps) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div className="mb-4">
            <FormLabel className="">{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div className="flex flex-row">
            {items.map((item) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem key={item.id} className="flex flex-row items-start ">
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
                      <FormLabel className="ml-1 mr-4 font-normal">{item.label}</FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
