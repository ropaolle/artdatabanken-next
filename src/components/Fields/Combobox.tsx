"use client";

import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type CustomFieldProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
  vertical?: boolean;
};

const languages = [
  { label: "English", value: "en" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Spanish", value: "es" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Chinese", value: "zh" },
] as const;

// This is the language that will be used in the dashboard.
// "Search framework..."

export default function Combobox({ form, name, label, placeholder, description, vertical }: CustomFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="my-2">{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("w-auto justify-between", !field.value && "text-muted-foreground")}
                  // className={cn("w-[200px] justify-between", !field.value && "text-muted-foreground")}
                >
                  {field.value
                    ? languages.find((language) => language.value === field.value)?.label
                    : "Select language"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder={placeholder} />
                <CommandEmpty>No framework found.</CommandEmpty>
                <CommandGroup>
                  {languages.map((language) => (
                    <CommandItem
                      value={language.label}
                      key={language.value}
                      onSelect={() => {
                        form.setValue(name, language.value);
                      }}
                    >
                      <Check
                        className={cn("mr-2 h-4 w-4", language.value === field.value ? "opacity-100" : "opacity-0")}
                      />
                      {language.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
