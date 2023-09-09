import { useDebounce } from "use-debounce";
import { CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

// interface SearchProps {
//   selectedResult?: Product;
//   onSelectResult: (product: Product) => void;
// }

// interface SearchResultsProps {
//   query: string;
//   selectedResult: SearchProps["selectedResult"];
//   onSelectResult: SearchProps["onSelectResult"];
// }

export function SearchResults({ query, selectedResult, onSelectResult } /* : SearchResultsProps */) {
  // const [debouncedSearchQuery] = useDebouncedValue(query, 500);
  // TODO: bring my own hook
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<any>(null);
  const [debouncedSearchQuery] = useDebounce(query, 500);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.storage.from("images").list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
        search: debouncedSearchQuery,
      });

      setIsLoading(false);
      setImages(data);
    };

    getData();
  }, [debouncedSearchQuery]);

  console.log("images", images);

  console.log("query", debouncedSearchQuery /* , selectedResult, onSelectResult */);

  return (
    <CommandList>
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {/* {!isError && !isLoading && !data?.products.length && <div className="p-4 text-sm">No products found</div>} */}
      {/* {isError && <div className="p-4 text-sm">Something went wrong</div>} */}

      {images?.map(({ name, id }) => {
        return (
          <CommandItem key={id} onSelect={() => onSelectResult({ id, name })} value={name}>
            <Check className={cn("mr-2 h-4 w-4", selectedResult?.id === id ? "opacity-100" : "opacity-0")} />
            {name}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}
