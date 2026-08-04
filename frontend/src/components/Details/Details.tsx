import { ArrowLeft } from "lucide-react";

import Avatar from "../Avatar/Avatar";
import formatDate from "../../utils/formatDate";

import type { Contact } from "../../types/contact";

interface DetailsProps {
    contact: Contact | null;
    onEdit: () => void;
    onDelete: () => void;
    onBack: () => void;
}

function Details({
                     contact,
                     onEdit,
                     onDelete,
                     onBack,
                 }: DetailsProps) {
    if (!contact) {
        return (
            <section
                className="
                    h-full
                    min-w-0
                    flex-1
                    overflow-y-auto
                    bg-white
                    px-4
                    py-5
                
                    sm:px-6
                    sm:py-6
                
                    md:px-8
                    md:py-7
                
                    2xl:px-10
                    2xl:py-9
                
                    dark:bg-slate-900
                "
            >
                <p className="text-sm 2xl:text-base">
                    No contact selected
                </p>
            </section>
        );
    }

    return (
        <section
            className="
                min-w-0
                flex-1
                bg-white
                px-8
                py-7

                2xl:px-10
                2xl:py-9

                dark:bg-slate-900
            "
        >
            <button
                type="button"
                onClick={onBack}
                aria-label="Back to contacts"
                className="
                    mb-5
                    inline-flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-slate-300
                    text-slate-600
                    transition
                    hover:bg-slate-100
                
                    md:hidden
                
                    dark:border-slate-600
                    dark:text-slate-300
                    dark:hover:bg-slate-800
                "
            >
                <ArrowLeft className="h-5 w-5" />
            </button>

            <header
                className="
                    mb-6
                    flex
                    flex-col
                    gap-5
                
                    md:flex-row
                    md:items-center
                    md:justify-between
                
                    2xl:mb-8
                "
            >
                <div className="flex min-w-0 items-center gap-4 sm:gap-5 2xl:gap-6">
                    <Avatar
                        name={contact.name}
                        size="large"
                        isActive
                    />

                    <div className="min-w-0">
                        <h1
                            className="
                                truncate
                                text-2xl
                                font-bold
                                tracking-tight
                                text-slate-900
                            
                                sm:text-3xl
                                2xl:text-4xl
                            
                                dark:text-white
                            "
                        >
                            {contact.name}
                        </h1>

                        <p
                            className="
                                mt-1
                                text-sm
                                text-slate-500

                                2xl:mt-1.5
                                2xl:text-base

                                dark:text-slate-400
                            "
                        >
                            Added {formatDate(contact.created_at)}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="
                            rounded-lg
                            border
                            border-slate-300
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-slate-600
                            transition
                            hover:bg-slate-100
                        
                            dark:border-slate-600
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
                            border
                            border-red-300
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-red-600
                            transition
                            hover:bg-red-50

                            dark:border-red-800
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
                        grid-cols-1
                        items-start
                        gap-2
                        border-b
                        border-slate-200
                        px-5
                        py-4

                        sm:grid-cols-[120px_1fr]
                        sm:gap-0
                        sm:px-6
                        sm:py-5

                        2xl:grid-cols-[150px_1fr]
                        2xl:px-8
                        2xl:py-6

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

                            2xl:text-sm

                            dark:text-slate-500
                        "
                    >
                        Phone
                    </span>

                    <span
                        className="
                            text-sm
                            font-[470]
                            text-slate-900

                            2xl:text-base

                            dark:text-white
                        "
                    >
                        {contact.phone || "Not specified"}
                    </span>
                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        items-start
                        gap-2
                        border-b
                        border-slate-200
                        px-5
                        py-4

                        sm:grid-cols-[120px_1fr]
                        sm:gap-0
                        sm:px-6
                        sm:py-5

                        2xl:grid-cols-[150px_1fr]
                        2xl:px-8
                        2xl:py-6

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

                            2xl:text-sm

                            dark:text-slate-500
                        "
                    >
                        Email
                    </span>

                    <span
                        className="
                            break-all
                            text-sm
                            font-[470]
                            text-slate-900

                            2xl:text-base

                            dark:text-white
                        "
                    >
                        {contact.email || "Not specified"}
                    </span>
                </div>

                <div
                    className="
                        grid
                        grid-cols-1
                        items-start
                        gap-2
                        border-b
                        border-slate-200
                        px-5
                        py-4
                    
                        sm:grid-cols-[120px_1fr]
                        sm:gap-0
                        sm:px-6
                        sm:py-5
                    
                        2xl:grid-cols-[150px_1fr]
                        2xl:px-8
                        2xl:py-6
                    
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

                            2xl:text-sm

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

                            2xl:text-base
                            2xl:leading-7

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