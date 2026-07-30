import { Moon, Plus, Sun } from "lucide-react";

import Search from "../Search/Search";
import ContactList from "../ContactList/ContactList";

function Sidebar({ contacts, totalContacts, currentContact, onSelectContact, isDark, onToggleTheme, searchQuery, onSearchChange, onAddContact}) {
    return (
        <aside
            className="
                flex
                h-full
                min-h-0
                w-full
                flex-col
                border-r
                border-slate-200
                bg-slate-50
                px-4
                py-5

                md:w-85
                md:shrink-0
                md:px-5
                md:py-6

                xl:w-92.5
                xl:px-6
                xl:py-7

                2xl:w-105
                2xl:px-8
                2xl:py-8

                dark:border-slate-700
                dark:bg-slate-800
            "
        >
            <header
                className="
                    mb-6
                    flex
                    gap-4
                    justify-between

                    2xl:flex-row
                    2xl:items-start
                "
            >
                <div className="min-w-0">
                    <h1
                        className="
                            text-xl
                            font-semibold
                            tracking-tight
                            text-slate-900

                            sm:text-2xl

                            2xl:text-[1.8rem]

                            dark:text-white
                        "
                    >
                        Contacts List
                    </h1>

                    <p
                        className="
                            mt-0.5
                            font-medium
                            text-slate-500

                            2xl:mt-1
                            2xl:text-sm

                            dark:text-slate-400
                        "
                    >
                        {totalContacts} saved
                    </p>
                </div>

                <div className="flex gap-1.5 2xl:gap-2">
                    <button
                        type="button"
                        onClick={onToggleTheme}
                        aria-label="Toggle theme"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-lg
                            border
                            border-slate-300
                            text-slate-700
                            transition
                            hover:bg-slate-100

                            dark:border-slate-600
                            dark:text-slate-200
                            dark:hover:bg-slate-700
                        "
                    >
                        {isDark ? (
                            <Sun className="h-5 w-5" />
                        ) : (
                            <Moon className="h-5 w-5" />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onAddContact}
                        aria-label="Add contact"
                        className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            gap-2
                            whitespace-nowrap
                            rounded-xl
                            bg-blue-600
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition
                            hover:bg-blue-700

                            sm:w-auto
                            sm:px-3
                        "
                    >
                        <Plus
                            className="h-4.25 w-4.25"
                            strokeWidth={2.5}
                        />

                        <span className="hidden sm:inline">
                            Add contact
                        </span>
                    </button>
                </div>
            </header>

            <Search
                placeholder="Search name, phone, or email"
                value={searchQuery}
                onChange={onSearchChange}
            />

            <ContactList
                contacts={contacts}
                currentContact={currentContact}
                onSelectContact={onSelectContact}
            />
        </aside>
    );
}

export default Sidebar;