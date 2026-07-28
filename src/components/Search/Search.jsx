function Search({ placeholder }) {
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
                type="text"
                placeholder={placeholder}
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
                "
            />
        </div>
    );
}

export default Search;