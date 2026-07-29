import { useEffect, useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import ContactForm from "./components/ContactForm/ContactForm";
import contactsData from "./data/contacts.json";

function App() {
    const [contacts, setContacts] = useState(() => {

        const savedContacts =
            localStorage.getItem("contacts");

        if (savedContacts) {
            return JSON.parse(savedContacts);
        }

        return contactsData;
    });

    const [currentContactId, setCurrentContactId] = useState(null);

    const sortedContacts = [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name, ["uk", "en"])
    );

    const currentContact =
        sortedContacts.find(
            (contact) => contact.id === currentContactId
        ) ?? sortedContacts[0] ?? null;

    const [isDark, setIsDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );
    }, [contacts]);

    function toggleTheme() {
        setIsDark(prev => !prev);
    }

    function openCreateForm() {
        setEditingContact(null);
        setIsFormOpen(true);
    }

    function openEditForm() {
        if (!currentContact) {
            return;
        }

        setEditingContact(currentContact);
        setIsFormOpen(true);
    }

    function closeForm() {
        setIsFormOpen(false);
        setEditingContact(null);
    }

    function saveContact(contactData) {
        if (editingContact) {
            setContacts((prevContacts) =>
                prevContacts.map((contact) =>
                    contact.id === editingContact.id
                        ? contactData
                        : contact
                )
            );
        } else {
            setContacts((prevContacts) => [
                ...prevContacts,
                contactData
            ]);
        }

        setCurrentContactId(contactData.id);
        closeForm();
    }

    function deleteContact() {
        if (!currentContact) {
            return;
        }

        const isConfirmed = window.confirm(
            `Delete ${currentContact.name}?`
        );

        if (!isConfirmed) {
            return;
        }

        const updatedContacts = contacts.filter(
            (contact) => contact.id !== currentContact.id
        );

        const sortedUpdatedContacts = [...updatedContacts].sort((a, b) =>
            a.name.localeCompare(b.name, ["uk", "en"], {
                sensitivity: "base",
            })
        );

        setContacts(updatedContacts);
        setCurrentContactId(sortedUpdatedContacts[0]?.id ?? null);
    }

    const filteredContacts = sortedContacts.filter((contact) => {
        const query = searchQuery.trim().toLowerCase();

        const name = contact.name?.toLowerCase() || "";
        const phone = contact.phone?.toLowerCase() || "";
        const email = contact.email?.toLowerCase() || "";

        return (
            name.includes(query) ||
            phone.includes(query) ||
            email.includes(query)
        );
    });

    return (
        <main className={isDark ? "dark" : ""}>
            <div className="h-screen overflow-hidden bg-slate-200 p-4 dark:bg-slate-950">
                <div
                    className="
                        flex
                        h-full
                        min-h-0
                        overflow-hidden
                        rounded-3xl
                        bg-white
                        shadow-xl

                        dark:bg-slate-900
                    "
                >
                <Sidebar
                    contacts={filteredContacts}
                    totalContacts={contacts.length}
                    currentContact={currentContact}
                    onSelectContact={(contact) =>
                        setCurrentContactId(contact.id)
                    }
                    isDark={isDark}
                    onToggleTheme={toggleTheme}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    onAddContact={openCreateForm}
                />

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
                    />
                )}
                </div>
            </div>
        </main>
    );
}

export default App;