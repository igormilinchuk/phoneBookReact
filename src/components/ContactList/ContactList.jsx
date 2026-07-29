import ContactItem from "../ContactItem/ContactItem";
import groupContactsByLetter from "../../utils/groupContactsByLetter";

function ContactList({ contacts, currentContact, onSelectContact}) {
    const groupedContacts = groupContactsByLetter(contacts);

    return (
        <nav
            className="custom-scrollbar min-h-0 flex-1 overflow-y-auto"
            aria-label="Contacts"
        >
            {Object.entries(groupedContacts).map(([letter, letterContacts]) => (
                <section key={letter}>
                    <h2 className="px-3 py-2 text-sm font-bold text-slate-500">
                        {letter}
                    </h2>

                    <ul>
                        {letterContacts.map((contact) => (
                            <ContactItem
                                key={contact.id}
                                contact={contact}
                                isActive={contact.id === currentContact?.id}
                                onSelect={onSelectContact}
                            />
                        ))}
                    </ul>
                </section>
            ))}
        </nav>
    );
}

export default ContactList;