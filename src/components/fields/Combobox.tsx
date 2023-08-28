"use client";

import { useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, /* ChevronsUpDown, */ X } from "lucide-react";
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
};

export default function Combobox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, placeholder, description, options }: ComboboxProps<TName>) {
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
            <FormControl></FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    role="combobox"
                    className={cn("flex h-10 w-full justify-between", !field.value && "text-muted-foreground")}
                  >
                    {field.value ? options.find((option) => option.value === field.value)?.label : placeholder}
                    {/* <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" /> */}
                    <Button
                      variant="link"
                      className="px-0"
                      title="clear field"
                      onClick={(e) => {
                        e.preventDefault();
                        resetField(name);
                      }}
                    >
                      <X className="h-4 w-4 opacity-50" />
                    </Button>
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder={placeholder} />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandList>
                    <CommandGroup>
                      {options.map((option) => (
                        <CommandItem
                          value={option.label}
                          key={option.value}
                          onSelect={() => {
                            setValue<string>(name, option.value);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn("mr-2 h-4 w-4", option.value === field.value ? "opacity-100" : "opacity-0")}
                          />
                          {option.label}
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
