import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input as InputComponent } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "../ui/utils";

type InputProps<TName> = {
  name: TName;
  label?: string;
  description?: string;
  vertical?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export default function Input<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, vertical, placeholder, hidden, ...props }: InputProps<TName>) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(hidden && "hidden", !hidden && vertical && "flex flex-wrap")}>
          <FormLabel className={cn(vertical && "basis-[25%] self-center")}>{label || name}</FormLabel>
          <FormControl>
            <InputComponent placeholder={placeholder} {...field} {...props} className={cn(vertical && "basis-[75%]")} />
          </FormControl>
          <FormDescription className={cn(vertical && "mt-0 basis-full text-right")}>{description}</FormDescription>
          <FormMessage className={cn(vertical && "mt-0 basis-full text-right font-normal")} />
        </FormItem>
      )}
    />
  );
}
