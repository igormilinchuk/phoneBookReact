import Avatar from "../Avatar/Avatar";

function ContactItem({ contact, isActive, onSelect }) {
    return (
        <li
            onClick={() => onSelect(contact)}
            className={`
                flex
                min-h-18
                cursor-pointer
                items-center
                gap-3.5
                rounded-xl
                border
                px-3
                py-2
                transition

        ${
                isActive
                    ? `
                        border-blue-200
                        bg-blue-50
                        
                        dark:border-slate-600
                        dark:bg-slate-700
                `
                    : `
                        border-transparent
                        hover:bg-slate-100
                        
                        dark:hover:bg-slate-700
                `
            }
    `}
        >
            <Avatar
                name={contact.name}
                isActive={isActive}
            />

            <div className="min-w-0">
                <p
                    className="
                        truncate
                        text-base
                        font-semibold
                        text-slate-900

                        dark:text-white
                    "
                >
                    {contact.name}
                </p>

                <p
                    className="
                        mt-0.5
                        truncate
                        text-sm
                        text-slate-500

                        dark:text-slate-400
                    "
                >
                    {contact.phone || contact.email}
                </p>
            </div>
        </li>
    );
}

export default ContactItem;