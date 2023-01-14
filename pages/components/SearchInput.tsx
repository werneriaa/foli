import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { MdSearch } from "react-icons/md";

type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

type SearchInput = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "onChange"
> & { stops: Foli.Stop; setSuggestions: Dispatch<SetStateAction<Foli.Stop>> };

export const SearchInput: React.FC<SearchInput> = ({
  stops,
  setSuggestions,
  ...props
}) => {
  const [search, setSearch] = useState("");

  function filterObject<T extends object>(
    obj: T,
    fn: (entry: Entry<T>, i: number, arr: Entry<T>[]) => boolean
  ) {
    return Object.fromEntries(
      (Object.entries(obj) as Entry<T>[]).filter(fn)
    ) as Partial<T>;
  }

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);

    const exactMatch = filterObject(stops, ([k, v]) => k === value);
    if (exactMatch?.stop_name) {
      setSuggestions({});
      console.log("Exact match", exactMatch);
      return;
    }
    if (value.length > 2) {
      // Check if name matches
      const normalizedValue = value.toLowerCase().replace(/\s+/g, " ");
      const x = filterObject(stops, ([k, v]) => {
        const normalized = stops[k]?.stop_name
          ?.toLowerCase()
          .replace(/\s+/g, " ");
        return normalized.startsWith(normalizedValue);
      });
      setSuggestions(x as Foli.Stop);
      return;
    } else {
      setSuggestions({});
    }
  };

  return (
    <div className="relative flex">
      <input
        onChange={onChange}
        value={search}
        type="text"
        {...props}
        className="rounded border border-gray-300 pl-2 pr-14 h-14 w-full text-2xl placeholder:text-gray-400 focus:outline-cyan-500"
      />
      <MdSearch className="absolute right-2 h-10 w-10 text-cyan-500 top-2" />
    </div>
  );
};
