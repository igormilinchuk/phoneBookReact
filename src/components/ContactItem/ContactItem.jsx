import Avatar from "../Avatar/Avatar";

function ContactItem({ contact, isActive, onSelect }) {
    return (
        <li
            onClick={() => onSelect(contact)}
            className={`
                flex
                min-h-[66px]
                cursor-pointer
                items-center
                gap-3
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
                        text-sm
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
                        text-xs
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