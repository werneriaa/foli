import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { MdSearch } from "react-icons/md";
import { filterObject } from "../functions";

type Entry<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T];

type SearchInput = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type" | "onChange"
> & {
  stops: Foli.Stop;
  setSuggestions: Dispatch<SetStateAction<Foli.Stop>>;
  setSelectedStop: Dispatch<SetStateAction<string | undefined>>;
};

export const SearchInput: React.FC<SearchInput> = ({
  stops,
  setSuggestions,
  setSelectedStop,
  ...props
}) => {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setSearch(value);

    const exactMatch = filterObject(stops, ([k, v]) => k === value);
    if (exactMatch[value]?.stop_name) {
      setSelectedStop(value);
      router.push({ query: { stop: value } });
      return;
    }
    setSelectedStop(undefined);
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
        className="rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white pl-2 pr-14 h-14 w-full text-2xl placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-cyan-500"
      />
      <MdSearch className="absolute right-2 h-10 w-10 text-cyan-500 top-2" />
    </div>
  );
};
