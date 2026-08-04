import type { ChangeEvent } from "react";

import { Search as SearchIcon } from "lucide-react";

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

    function handleChange(
        event: ChangeEvent<HTMLInputElement>
    ) {
        onChange(event.target.value);
    }

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
                    -translate-y-1/2
                    text-slate-400

                    dark:text-slate-500
                "
                />

                <input
                    id="search"
                    type="search"
                    placeholder={placeholder}
                    value={value}
                    onChange={handleChange}
                    autoComplete="off"
                    className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    pl-10
                    pr-4
                    text-sm
                    text-slate-900
                    outline-none
                    transition
                    placeholder:text-slate-400
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-500/15

                    dark:border-slate-600
                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder:text-slate-400
                    dark:focus:border-blue-400
                    dark:focus:ring-blue-400/20
                "
                />
            </div>
        </div>
    );
}

export default Search;