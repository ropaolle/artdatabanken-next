"use client";

import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Control, FieldPathByValue, FieldValues } from "react-hook-form";

const items = [
  {
    id: "recents",
    label: "Recents",
  },
  {
    id: "home",
    label: "Home",
  },
  {
    id: "applications",
    label: "Applications",
  },
  {
    id: "desktop",
    label: "Desktop",
  },
  {
    id: "downloads",
    label: "Downloads",
  },
  {
    id: "documents",
    label: "Documents",
  },
] as const;

// const FormSchema = z.object({
//   items: z.array(z.string()).refine((value) => value.some((item) => item), {
//     message: "You have to select at least one item.",
//   }),
// });

// type CustomFieldProps = {
//   form: any;
//   name: string;
//   label?: string;
//   placeholder?: string;
//   description?: string;
//   vertical?: boolean;
// };

export default function Checkboxes<TFieldValues extends FieldValues, TPath extends FieldPathByValue<TFieldValues, any>>({
  control,
  name,
  label,
  // placeholder,
  description,
  // vertical,
}: {
  control: Control<TFieldValues>;
  name: TPath;
  label?: string;
  // placeholder?: string;
  description?: string;
  // vertical: boolean;
}) {
// export default function Checkboxes({ form, name, label, placeholder, description, vertical }: CustomFieldProps) {
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
                            : field.onChange(field.value?.filter((value) => value !== item.id));
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
