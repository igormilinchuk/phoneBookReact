import { Moon, Sun } from "lucide-react";

import Search from "../Search/Search";
import ContactList from "../ContactList/ContactList";

function Sidebar({ contacts, totalContacts, currentContact, onSelectContact, isDark, onToggleTheme, searchQuery, onSearchChange, onAddContact}) {
    return (
        <aside
            className="
                flex
                min-h-0
                w-96
                shrink-0
                max-w-md
                flex-col
                bg-slate-50
                p-5

                dark:bg-slate-800
    "
        >
            <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                        Contacts List
                    </h1>

                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        {totalContacts} saved
                    </p>
                </div>

                <div className="flex gap-2">
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
                            hover:bg-slate-100
                            dark:border-slate-600
                            dark:text-slate-200
                            dark:hover:bg-slate-700
    "
                    >
                        {isDark ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={onAddContact}
                        className="
                            rounded-lg
                            bg-blue-600
                            px-4
                            py-2
                            font-medium
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        Add contact
                    </button>
                </div>
            </header>

            <Search
                placeholder="Search contacts"
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