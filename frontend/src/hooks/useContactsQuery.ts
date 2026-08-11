import { useMemo, useState } from "react";

import { toast } from "sonner";

import {
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

import {
    createContact,
    deleteContact as deleteContactApi,
    getContacts,
    updateContact,
} from "../api/contactsApi";

import type { Contact } from "../types/contact";

type MobileView = "list" | "details" | "form";

const CONTACTS_QUERY_KEY = ["contacts"] as const;

export function useContactsQuery() {
    const queryClient = useQueryClient();

    const {
        data: contacts = [],
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: CONTACTS_QUERY_KEY,
        queryFn: getContacts,
    });

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

    const createMutation = useMutation({
        mutationFn: createContact,

        onSuccess: async (createdContact) => {
            await queryClient.invalidateQueries({
                queryKey: CONTACTS_QUERY_KEY,
            });

            setCurrentContactId(createdContact.id);
            setIsFormOpen(false);
            setEditingContact(null);
            setMobileView("details");

            toast.success("Contact created");
        },

        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to create contact"
            );
        },
    });

    const updateMutation = useMutation({
        mutationFn: updateContact,

        onSuccess: async (updatedContact) => {
            await queryClient.invalidateQueries({
                queryKey: CONTACTS_QUERY_KEY,
            });

            setCurrentContactId(updatedContact.id);
            setIsFormOpen(false);
            setEditingContact(null);
            setMobileView("details");

            toast.success("Contact updated");
        },

        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to update contact"
            );
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteContactApi,

        onSuccess: async (_data, deletedId) => {
            const remainingContacts =
                contacts.filter(
                    (contact) =>
                        contact.id !== deletedId
                );

            const nextContact =
                [...remainingContacts].sort((a, b) =>
                    a.name.localeCompare(
                        b.name,
                        ["uk", "en"]
                    )
                )[0] ?? null;

            setCurrentContactId(
                nextContact?.id ?? null
            );

            setMobileView(
                nextContact ? "details" : "list"
            );

            await queryClient.invalidateQueries({
                queryKey: CONTACTS_QUERY_KEY,
            });

            toast.success("Contact deleted");
        },

        onError: (error) => {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete contact"
            );
        },
    });

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
        const payload = {
            name: contactData.name,
            phone: contactData.phone,
            email: contactData.email,
            note: contactData.note,
        };

        if (editingContact) {
            updateMutation.mutate({
                id: editingContact.id,
                ...payload,
            });

            return;
        }

        createMutation.mutate(payload);
    }

    function deleteContact() {
        if (!currentContact) {
            return;
        }

        deleteMutation.mutate(currentContact.id);
    }

    return {
        contacts,
        filteredContacts,
        currentContact,
        editingContact,
        searchQuery,
        isFormOpen,
        mobileView,

        isLoading,
        isError,
        error,

        isSaving:
            createMutation.isPending ||
            updateMutation.isPending,

        isDeleting:
        deleteMutation.isPending,

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