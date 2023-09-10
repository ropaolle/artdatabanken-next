"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Check, ChevronsUpDown, Loader2, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

type Option = { label: string; value: string };

type BaseComboboxProps<TName> = {
  name: TName;
  options: readonly Option[];
  label?: string;
  description?: string;
  placeholder?: string;
  commandEmptyText?: string;
  isClearable?: boolean;
  closeOnSelect?: boolean;
  shouldFilter?: boolean;
  loading?: boolean;
  async?: boolean;
  onSearch?: (query: string) => void;
};

function BaseCombobox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  options,
  label = "",
  description = "",
  placeholder = "",
  commandEmptyText = "No framework found.",
  isClearable = true,
  closeOnSelect = true,
  shouldFilter = true,
  loading = false,
  async = false,
  onSearch,
}: BaseComboboxProps<TName>) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebouncedValue(searchQuery, 500);

  const { control, setValue, resetField } = useFormContext();

  useEffect(() => {
    if (typeof onSearch === "function") {
      onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

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
                <Command shouldFilter={shouldFilter}>
                  <CommandInput placeholder={placeholder} value={searchQuery} onValueChange={setSearchQuery} />
                  <CommandEmpty>{commandEmptyText}</CommandEmpty>
                  {async && loading && (
                    <div className="absolute right-4 flex h-11 flex-row items-center">
                      <Loader2 className="h-5 w-5 animate-spin opacity-50" />
                    </div>
                  )}
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

export type ComboboxProps<TName> = Omit<BaseComboboxProps<TName>, "loading" | "async" | "onSearch">;

export function Combobox<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: ComboboxProps<TName>) {
  return <BaseCombobox commandEmptyText="No framework found." {...props} />;
}

export type AsyncComboboxProps<TName> = Omit<BaseComboboxProps<TName>, "loading" | "async" | "onSearch" | "options">;

export function ComboboxAsync<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ ...props }: AsyncComboboxProps<TName>) {
  const [asyncOptions, setAsyncOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient();

  // TODO: Break out the search function to parent.
  const handleSearch = async (query: string) => {
    setLoading(true);

    // TODO: Error handeling
    const { data /* , error */ } = await supabase.storage.from("images").list("", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
      search: query,
    });

    const images = data?.map(({ id, name }) => ({ value: name, label: name })) || [];
    setAsyncOptions(images);

    setLoading(false);
  };

  return (
    <BaseCombobox
      commandEmptyText="No data found."
      shouldFilter
      {...props}
      async
      options={asyncOptions}
      onSearch={handleSearch}
      loading={loading}
    />
  );
}
