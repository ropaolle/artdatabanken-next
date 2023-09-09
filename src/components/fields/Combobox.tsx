"use client";

import { useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { cn } from "@/lib/utils";

type Option = { label: string; value: string };

type ComboboxProps<TName> = {
  name: TName;
  label?: string;
  placeholder?: string;
  description?: string;
  options: readonly Option[];
  isClearable?: boolean;
  closeOnSelect?: boolean;
  commandEmptyText?: string;
};

export default function Combobox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  label,
  placeholder,
  description,
  options,
  isClearable = true,
  closeOnSelect = true,
  commandEmptyText = "No framework found.",
}: ComboboxProps<TName>) {
  const [open, setOpen] = useState(false);
  const { control, setValue, resetField } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <div className="relative">
                    <Button
                      type="button"
                      variant="outline"
                      role="combobox"
                      className={cn("flex h-10 w-full justify-between", !field.value && "text-muted-foreground")}
                    >
                      {field.value ? options?.find((option) => option.value === field.value)?.label : placeholder}
                      {!isClearable && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                    </Button>
                    {isClearable && (
                      <Button
                        variant="link"
                        className="absolute right-2 top-[8px] h-6 w-6 rounded-full px-0 hover:bg-slate-100"
                        title="clear field"
                        onClick={(e) => {
                          e.preventDefault();
                          resetField(name);
                        }}
                      >
                        <X className="h-4 w-4 opacity-50" />
                      </Button>
                    )}
                  </div>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="p-0">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandEmpty>{commandEmptyText}</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {options?.map(({ value, label }) => (
                        <CommandItem
                          key={value}
                          value={value}
                          onSelect={() => {
                            setValue<string>(name, value);
                            closeOnSelect && setOpen(false);
                          }}
                        >
                          <Check className={cn("mr-2 h-4 w-4", value === field.value ? "opacity-100" : "opacity-0")} />
                          {label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
