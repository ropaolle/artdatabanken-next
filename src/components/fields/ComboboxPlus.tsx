"use client";

import { forwardRef, useState } from "react";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useFormContext, type FieldPath, type FieldValues, UseFormResetField } from "react-hook-form";
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

type ComboboxFormControlProps = {
  value: string;
  options: readonly Option[];
  placeholder?: string;
  isClearable: boolean;
  resetField: () => void;
};

const ComboboxFormControl = forwardRef(
  ({ value, options, placeholder = "", isClearable = false, resetField }: ComboboxFormControlProps, ref) => (
    <PopoverTrigger asChild>
      <FormControl>
        <div className="relative">
          <Button
            type="button"
            variant="outline"
            role="combobox"
            className={cn("flex h-10 w-full justify-between", !value && "text-muted-foreground")}
          >
            {value ? options?.find((option) => option.value === value)?.label : placeholder}
            {!isClearable && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
          </Button>
          {isClearable && (
            <Button
              variant="link"
              className="absolute right-2 top-[8px] h-6 w-6 rounded-full px-0 hover:bg-slate-100"
              title="clear field"
              onClick={(e) => {
                e.preventDefault();
                resetField();
              }}
            >
              <X className="h-4 w-4 opacity-50" />
            </Button>
          )}
        </div>
      </FormControl>
    </PopoverTrigger>
  ),
);

type ComboboxCommandProps = {
  value: string;
  options: readonly Option[];
  placeholder?: string;
  commandEmptyText: string;
  setValue: (value: string) => void;
  setOpen: () => void;
};

ComboboxFormControl.displayName = "ComboboxFormControl";

const ComboboxCommand = forwardRef(
  ({ placeholder, options, commandEmptyText, setValue, setOpen }: ComboboxCommandProps, ref) => (
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
                setValue(value);
                setOpen();
              }}
            >
              <Check className={cn("mr-2 h-4 w-4", value === value ? "opacity-100" : "opacity-0")} />
              {label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  ),
);

ComboboxCommand.displayName = "ComboboxCommand";

export default function ComboboxPlus<
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

  const resetCurrentField = () => resetField(name);
  const setCurrentValue = (value: string) => setValue<string>(name, value);
  const closeCurrent = () => closeOnSelect && setOpen(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className="">
            <FormLabel>{label}</FormLabel>
            <Popover open={open} onOpenChange={setOpen}>
              <ComboboxFormControl
                value={field.value}
                options={options}
                placeholder={placeholder}
                isClearable={isClearable}
                resetField={resetCurrentField}
              />
              <PopoverContent className="p-0">
                <ComboboxCommand
                  value={field.value}
                  options={options}
                  commandEmptyText={commandEmptyText}
                  setValue={setCurrentValue}
                  setOpen={closeCurrent}
                />
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
