import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useFormContext, type FieldPath, type FieldValues } from "react-hook-form";

type Item = { label: string; id: string };

type CheckboxProps<TName> = {
  name: TName;
  label?: string;
  description?: string;
  items: readonly Item[];
};

export default function Checkboxes<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({ name, label, description, items }: CheckboxProps<TName>) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <div>
            <FormLabel htmlFor={items[0].id}>{label}</FormLabel>
            <FormDescription>{description}</FormDescription>
          </div>
          <div className="flex h-10 flex-row items-center">
            {items.map((item, i) => (
              <FormField
                key={item.id}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem /* key={item.id} */ className="flex flex-row items-start ">
                      <FormControl>
                        <Checkbox
                          id={`${item.id}`}
                          name={`${item.id}`}
                          checked={field.value?.includes(item.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, item.id])
                              : field.onChange(field.value?.filter((value: string) => value !== item.id));
                          }}
                        />
                      </FormControl>
                      <FormLabel htmlFor={item.id} className="ml-1 mr-4 font-normal">
                        {item.label}
                      </FormLabel>
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
