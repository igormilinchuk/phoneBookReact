import Avatar from "../Avatar/Avatar";

function ContactItem({ contact, isActive, onSelect }) {
    return (
        <li
            onClick={() => onSelect(contact)}
            className={`
                flex
                cursor-pointer
                items-center
                gap-4
                rounded-lg
                p-3

                ${
                isActive
                    ? "bg-blue-100 dark:bg-slate-700"
                    : "hover:bg-blue-50 dark:hover:bg-slate-700"
            }
            `}
        >
            <Avatar name={contact.name} />

            <div className="min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">
                    {contact.name}
                </p>

                <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                    {contact.phone || contact.email}
                </p>
            </div>
        </li>
    );
}

export default ContactItem;