function Search({ placeholder, value, onChange }) {
    function handleChange(event) {
        onChange(event.target.value);
    }

    return (
        <div className="mb-6">
            <label
                htmlFor="search"
                className="sr-only"
            >
                Search contacts
            </label>

            <input
                id="search"
                type="search"
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                autoComplete="off"
                className="
                    w-full
                    rounded-lg
                    border
                    border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    focus:border-blue-600
                    focus:ring-2
                    focus:ring-blue-200

                    dark:border-slate-600
                    dark:bg-slate-700
                    dark:text-white
                    dark:placeholder:text-slate-400
                    dark:focus:border-blue-400
                    dark:focus:ring-blue-900
                "
            />
        </div>
    );
}

export default Search;