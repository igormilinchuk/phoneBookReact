import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchProps {
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
}

function Search({
                    placeholder,
                    value,
                    onChange,
                }: SearchProps) {
    return (
        <div className="mb-4">
            <label
                htmlFor="search"
                className="sr-only"
            >
                Search contacts
            </label>

            <div className="relative">
                <SearchIcon
                    size={18}
                    aria-hidden="true"
                    className="
                        pointer-events-none
                        absolute
                        left-3.5
                        top-1/2
                        z-10
                        -translate-y-1/2
                        text-slate-400

                        dark:text-slate-500
                    "
                />

                <Input
                    id="search"
                    type="search"
                    placeholder={placeholder}
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    autoComplete="off"
                    className="
                        h-11
                        rounded-xl
                        border-slate-200
                        bg-white
                        pl-10
                        pr-4
                        text-sm
                        text-slate-900
                        shadow-none

                        placeholder:text-slate-400

                        focus-visible:border-blue-500
                        focus-visible:ring-2
                        focus-visible:ring-blue-500/15

                        dark:border-slate-600
                        dark:bg-slate-700
                        dark:text-white
                        dark:placeholder:text-slate-400
                        dark:focus-visible:border-blue-400
                        dark:focus-visible:ring-blue-400/20
                    "
                />
            </div>
        </div>
    );
}

export default Search;