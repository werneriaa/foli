import { MdSearch } from "react-icons/md";

type SearchInput = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  "type"
>;

export const SearchInput: React.FC<SearchInput> = ({ ...props }) => {
  return (
    <div className="relative flex">
      <input
        type="text"
        {...props}
        className="rounded border border-gray-300 pl-2 pr-14 h-14 w-full text-2xl placeholder:text-gray-400 focus:outline-cyan-500"
      />
      <MdSearch className="absolute right-2 h-10 w-10 text-cyan-500 top-2" />
    </div>
  );
};
