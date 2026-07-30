import ContactItem from "../ContactItem/ContactItem";
import groupContactsByLetter from "../../utils/groupContactsByLetter";

function ContactList({
                         contacts,
                         currentContact,
                         onSelectContact
                     }) {
    const groupedContacts =
        groupContactsByLetter(contacts);

    if (contacts.length === 0) {
        return (
            <div
                className="
                    flex
                    min-h-0
                    flex-1
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                "
            >
                <p
                    className="
                        text-sm
                        font-medium
                        text-slate-700

                        dark:text-slate-200
                    "
                >
                    No matches found
                </p>

                <p
                    className="
                        mt-1
                        text-xs
                        text-slate-500

                        dark:text-slate-400
                    "
                >
                    Try another name, phone, or email
                </p>
            </div>
        );
    }

    return (
        <nav
            className="
                custom-scrollbar
                min-h-0
                flex-1
                overflow-y-auto
                pr-1
            "
            aria-label="Contacts"
        >
            {Object.entries(groupedContacts).map(
                ([letter, letterContacts]) => (
                    <section key={letter}>
                        <h2
                            className="
                                px-3
                                pb-2
                                pt-5
                                text-xs
                                font-semibold
                                uppercase
                                tracking-wide
                                text-slate-400

                                dark:text-slate-500
                            "
                        >
                            {letter}
                        </h2>

                        <ul>
                            {letterContacts.map((contact) => (
                                <ContactItem
                                    key={contact.id}
                                    contact={contact}
                                    isActive={
                                        contact.id === currentContact?.id
                                    }
                                    onSelect={onSelectContact}
                                />
                            ))}
                        </ul>
                    </section>
                )
            )}
        </nav>
    );
}

export default ContactList;