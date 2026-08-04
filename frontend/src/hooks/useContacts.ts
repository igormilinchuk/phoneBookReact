import { useEffect, useMemo, useState } from "react";

import contactsData from "../data/contacts.json";

import type { Contact } from "../types/contact";

export type MobileView = "list" | "details" | "form";

function readInitialContacts(): Contact[] {
    const savedContacts = localStorage.getItem("contacts");

    if (!savedContacts) {
        return contactsData as Contact[];
    }

    try {
        return JSON.parse(savedContacts) as Contact[];
    } catch {
        return contactsData as Contact[];
    }
}

export default function useContacts() {
    const [contacts, setContacts] =
        useState<Contact[]>(readInitialContacts);

    const [currentContactId, setCurrentContactId] =
        useState<number | null>(null);

    const [searchQuery, setSearchQuery] =
        useState("");

    const [isFormOpen, setIsFormOpen] =
        useState(false);

    const [editingContact, setEditingContact] =
        useState<Contact | null>(null);

    const [mobileView, setMobileView] =
        useState<MobileView>("list");

    useEffect(() => {
        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );
    }, [contacts]);

    const sortedContacts = useMemo(
        () =>
            [...contacts].sort((a, b) =>
                a.name.localeCompare(
                    b.name,
                    ["uk", "en"],
                    {
                        sensitivity: "base",
                    }
                )
            ),
        [contacts]
    );

    const currentContact =
        sortedContacts.find(
            (contact) =>
                contact.id === currentContactId
        ) ??
        sortedContacts[0] ??
        null;

    const filteredContacts = useMemo(() => {
        const query =
            searchQuery.trim().toLowerCase();

        if (!query) {
            return sortedContacts;
        }

        return sortedContacts.filter((contact) => {
            const name =
                contact.name.toLowerCase();

            const phone =
                contact.phone.toLowerCase();

            const email =
                contact.email.toLowerCase();

            return (
                name.includes(query) ||
                phone.includes(query) ||
                email.includes(query)
            );
        });
    }, [sortedContacts, searchQuery]);

    function openCreateForm() {
        setEditingContact(null);
        setIsFormOpen(true);
        setMobileView("form");
    }

    function openEditForm() {
        if (!currentContact) {
            return;
        }

        setEditingContact(currentContact);
        setIsFormOpen(true);
        setMobileView("form");
    }

    function closeForm() {
        setIsFormOpen(false);

        setMobileView(
            editingContact ? "details" : "list"
        );

        setEditingContact(null);
    }

    function selectContact(contact: Contact) {
        setCurrentContactId(contact.id);
        setMobileView("details");
    }

    function saveContact(contactData: Contact) {
        setContacts((prevContacts) => {
            if (editingContact) {
                return prevContacts.map((contact) =>
                    contact.id === editingContact.id
                        ? contactData
                        : contact
                );
            }

            return [
                ...prevContacts,
                contactData,
            ];
        });

        setCurrentContactId(contactData.id);
        setIsFormOpen(false);
        setEditingContact(null);
        setMobileView("details");
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

        const updatedContacts =
            contacts.filter(
                (contact) =>
                    contact.id !== currentContact.id
            );

        const nextContact =
            [...updatedContacts]
                .sort((a, b) =>
                    a.name.localeCompare(
                        b.name,
                        ["uk", "en"],
                        {
                            sensitivity: "base",
                        }
                    )
                )[0] ?? null;

        setContacts(updatedContacts);

        setCurrentContactId(
            nextContact?.id ?? null
        );

        if (!nextContact) {
            setMobileView("list");
        }
    }

    return {
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
    };
}