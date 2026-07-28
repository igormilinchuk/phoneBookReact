import { useState } from "react";

import Sidebar from "./components/Sidebar/Sidebar";
import Details from "./components/Details/Details";
import ContactForm from "./components/ContactForm/ContactForm";
import contactsData from "./data/contacts.json";

function App() {
    const [contacts, setContacts] = useState(contactsData);
    const [currentContact, setCurrentContact] = useState(contactsData[0]);
    const [isDark, setIsDark] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

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
            setContacts(prevContacts =>
                prevContacts.map(contact =>
                    contact.id === editingContact.id
                        ? contactData
                        : contact
                )
            );
        } else {
            setContacts(prevContacts => [
                ...prevContacts,
                contactData
            ]);
        }

        setCurrentContact(contactData);
        closeForm();
    }

    const filteredContacts = contacts.filter(contact => {
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
            <div className="flex min-h-screen bg-white dark:bg-slate-900">
                <Sidebar
                    contacts={filteredContacts}
                    totalContacts={contacts.length}
                    currentContact={currentContact}
                    onSelectContact={setCurrentContact}
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
                    />
                )}
            </div>
        </main>
    );
}

export default App;