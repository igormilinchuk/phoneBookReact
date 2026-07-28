function groupContactsByLetter(contacts) {
    const sortedContacts = [...contacts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const groupedContacts = {};

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