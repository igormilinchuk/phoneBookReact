import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import ContactForm from "./components/ContactForm/ContactForm";

import { useContactsQuery } from "./hooks/useContactsQuery";
import { useContactQuery } from "./hooks/useContactQuery";

import { Toaster } from "@/components/ui/sonner";

function App() {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            isDark
        );
    }, [isDark]);

    const {
        contacts,
        filteredContacts,
        currentContactId,

        editingContact,
        searchQuery,
        isFormOpen,
        mobileView,

        isLoading,
        isError,
        error,
        isSaving,
        isDeleting,

        setSearchQuery,
        setMobileView,

        openCreateForm,
        openEditForm,
        closeForm,
        selectContact,
        saveContact,
        deleteContact,
    } = useContactsQuery();

    const {
        data: currentContact,
        isLoading: isContactLoading,
        isError: isContactError,
        error: contactError,
    } = useContactQuery(currentContactId);

    function toggleTheme() {
        setIsDark((prev) => !prev);
    }


    if (isLoading) {
        return (
            <main>
                <div className="
                flex
                h-screen
                items-center
                justify-center
                bg-slate-100
                text-slate-600

                dark:bg-slate-950
                dark:text-slate-300
            ">
                    Loading contacts...
                </div>
            </main>
        );
    }

    if (isError) {
        return (
            <main>
                <div className="
                flex
                h-screen
                items-center
                justify-center
                bg-slate-100
                text-red-600

                dark:bg-slate-950
                dark:text-red-400
            ">
                    {error instanceof Error
                        ? error.message
                        : "Failed to load contacts"}
                </div>
            </main>
        );
    }

    return (
        <main>
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
                            currentContactId={currentContactId}
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
                                isSaving={isSaving}
                            />
                        ) : isContactLoading ? (
                            <div className="flex h-full items-center justify-center">
                                Loading contact...
                            </div>
                        ) : isContactError ? (
                            <div className="flex h-full items-center justify-center text-red-600">
                                {contactError instanceof Error
                                    ? contactError.message
                                    : "Failed to load contact"}
                            </div>
                        ) : (
                            <Details
                                contact={currentContact ?? null}
                                onEdit={() => {
                                    if (currentContact) {
                                        openEditForm(currentContact);
                                    }
                                }}
                                onDelete={() => {
                                    if (currentContact) {
                                        deleteContact(currentContact.id);
                                    }
                                }}
                                onBack={() => setMobileView("list")}
                                isDeleting={isDeleting}
                            />
                        )}
                    </div>
                </div>
            </div>
            <Toaster />
        </main>
    );
}

export default App;