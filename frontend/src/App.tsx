import { useState } from "react";

import Sidebar from "./src/components/Sidebar/Sidebar";
import Details from "./src/components/Details/Details";
import ContactForm from "./src/components/ContactForm/ContactForm";

import useContacts from "./src/hooks/useContacts";

function App() {
    const [isDark, setIsDark] =
        useState(false);

    const {
        contacts,
        filteredContacts,
        currentContact,
        editingContact,
        searchQuery,
        isFormOpen,
        mobileView,

        setSearchQuery,
        setMobileView,

        openCreateForm,
        openEditForm,
        closeForm,
        selectContact,
        saveContact,
        deleteContact,
    } = useContacts();

    function toggleTheme() {
        setIsDark((prev) => !prev);
    }

    return (
        <main className={isDark ? "dark" : ""}>
            <div
                className="
                flex
                h-screen
                items-center
                justify-center
                overflow-hidden
                bg-slate-100
                p-3

                sm:p-4
                lg:p-6
                2xl:p-8

                dark:bg-slate-950
            "
            >
                <div
                    className="
                    flex
                    h-full
                    min-h-0
                    w-full
                    max-w-[1600px]
                    overflow-hidden
                    bg-white
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-sm

                    dark:bg-slate-900
                    dark:border-slate-700
                "
                >
                    <div
                        className={`
                        h-full
                        w-full
                        shrink-0

                        md:block
                        md:w-auto

                        ${mobileView === "list" ? "block" : "hidden"}
                    `}
                    >
                        <Sidebar
                            contacts={filteredContacts}
                            totalContacts={contacts.length}
                            currentContact={currentContact}
                            onSelectContact={selectContact}
                            isDark={isDark}
                            onToggleTheme={toggleTheme}
                            searchQuery={searchQuery}
                            onSearchChange={setSearchQuery}
                            onAddContact={openCreateForm}
                        />
                    </div>

                    <div
                        className={`
                        h-full
                        min-w-0
                        flex-1

                        md:block

                        ${mobileView === "list" ? "hidden" : "block"}
                    `}
                    >
                        {isFormOpen ? (
                            <ContactForm
                                contact={editingContact}
                                onSave={saveContact}
                                onCancel={closeForm}
                            />
                        ) : (
                            <Details
                                contact={currentContact}
                                onEdit={openEditForm}
                                onDelete={deleteContact}
                                onBack={() => setMobileView("list")}
                            />
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default App;