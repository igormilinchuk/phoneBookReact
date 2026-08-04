import type { Contact } from "../types/contact";

function groupContactsByLetter(
    contacts: Contact[]
): Record<string, Contact[]> {

    const sortedContacts = [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const groupedContacts: Record<string, Contact[]> = {};

    sortedContacts.forEach((contact) => {
        const letter = contact.name.charAt(0).toUpperCase();

        if (!groupedContacts[letter]) {
            groupedContacts[letter] = [];
        }

        groupedContacts[letter].push(contact);
    });

    return groupedContacts;
}

export default groupContactsByLetter;