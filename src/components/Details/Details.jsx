import Avatar from "../Avatar/Avatar";
import { Pencil } from "lucide-react";

function Details({ contact, onEdit }) {
    if (!contact) {
        return (
            <section
                className="
                    flex
                    flex-1
                    items-center
                    justify-center
                    bg-white
                    text-slate-500

                    dark:bg-slate-900
                    dark:text-slate-400
                "
            >
                <p>No contact selected</p>
            </section>
        );
    }

    return (
        <section
            className="
                flex-1
                bg-white
                p-8

                dark:bg-slate-900
            "
        >
            <header className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Avatar
                        name={contact.name}
                        size="large"
                    />

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {contact.name}
                        </h1>

                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Contact details
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={onEdit}
                    aria-label="Edit contact"
                    className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-lg
            border
            border-slate-300
            text-slate-700
            hover:bg-slate-100
            dark:border-slate-600
            dark:text-slate-200
            dark:hover:bg-slate-800
        "
                >
                    <Pencil size={19} />
                </button>
            </header>

            <div
                className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200

                    dark:border-slate-700
                    dark:bg-slate-800
                "
            >
                <div className="grid grid-cols-[140px_1fr] border-b border-slate-200 px-7 py-6 dark:border-slate-700">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                        Phone
                    </span>

                    <span className="text-slate-900 dark:text-white">
                        {contact.phone || "Not specified"}
                    </span>
                </div>

                <div className="grid grid-cols-[140px_1fr] border-b border-slate-200 px-7 py-6 dark:border-slate-700">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                        Email
                    </span>

                    <span className="break-words text-slate-900 dark:text-white">
                        {contact.email || "Not specified"}
                    </span>
                </div>

                <div className="grid grid-cols-[140px_1fr] px-7 py-6">
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                        Note
                    </span>

                    <span className="text-slate-900 dark:text-white">
                        {contact.note || "No note"}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Details;