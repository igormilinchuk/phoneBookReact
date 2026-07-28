import getInitials from "../../utils/getInitials";

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
                ${isActive
                ? "bg-blue-100 border-l-4 border-blue-600"
                : "hover:bg-blue-50"
            }
            `}
        >
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-blue-600
                    font-bold
                    text-white
                "
            >
                {getInitials(contact.name)}
            </div>

            <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                    {contact.name}
                </p>

                <p className="truncate text-sm text-slate-500">
                    {contact.phone || contact.email}
                </p>
            </div>
        </li>
    );
}

export default ContactItem;