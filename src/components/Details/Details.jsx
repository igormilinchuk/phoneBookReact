import Avatar from "../Avatar/Avatar";
import formatDate from "../../utils/formatDate";

function Details({ contact, onEdit, onDelete }) {
    if (!contact) {
        return (
            <section
                className="
                    flex
                    flex-2
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
                px-8
                py-7

                dark:bg-slate-900
            "
        >
            <header className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-5">
                    <Avatar
                        name={contact.name}
                        size="large"
                        isActive
                    />

                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                            {contact.name}
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500

                                dark:text-slate-400
                            "
                        >
                            Added {formatDate(contact.created_at)}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-600
                            transition
                            border
                            border-slate-300
                            hover:bg-slate-100

                            dark:text-slate-300
                            dark:hover:bg-slate-800
                        "
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="
                            rounded-lg
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-red-600
                            transition
                            border
                            border-red-300
                            hover:bg-red-50

                            dark:hover:bg-red-950
                        "
                    >
                        Delete
                    </button>
                </div>
            </header>

            <div
                className="
                    overflow-hidden
                    rounded-xl
                    border
                    border-slate-200
                    bg-white

                    dark:border-slate-700
                    dark:bg-slate-800
                "
            >
                <div
                    className="
                        grid
                        grid-cols-[120px_1fr]
                        items-start
                        border-b
                        border-slate-200
                        px-6
                        py-5

                        dark:border-slate-700
                    "
                >
                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-400

                            dark:text-slate-500
                        "
                    >
                        Phone
                    </span>

                    <span className="
                                text-sm
                                font-[470]
                                text-slate-900
                                dark:text-white"
                    >
                            {contact.phone || "Not specified"}
                    </span>
                </div>

                <div
                    className="
                        grid
                        grid-cols-[120px_1fr]
                        items-start
                        border-b
                        border-slate-200
                        px-6
                        py-5

                        dark:border-slate-700
                    "
                >
                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-400

                            dark:text-slate-500
                        "
                    >
                        Email
                    </span>

                    <span
                        className="
                        break-all
                        text-sm
                        text-slate-900
                        font-[470]

                        dark:text-white
                    "
                    >
                        {contact.email || "Not specified"}
                    </span>
                </div>

                <div
                    className="
                        grid
                        grid-cols-[120px_1fr]
                        items-start
                        px-6
                        py-5
                "
                >
                    <span
                        className="
                            text-xs
                            font-semibold
                            uppercase
                            tracking-wider
                            text-slate-400

                            dark:text-slate-500
                        "
                    >
                        Note
                    </span>

                    <span
                        className="
                            whitespace-pre-wrap
                            text-sm
                            leading-6
                            text-slate-600

                            dark:text-slate-300
                        "
                    >
                        {contact.note || "No note"}
                    </span>
                </div>
            </div>
        </section>
    );
}

export default Details;