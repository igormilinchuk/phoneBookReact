import { useState } from "react";

function ContactForm({ contact, onSave, onCancel }) {
    const [formData, setFormData] = useState({
        name: contact?.name || "",
        phone: contact?.phone || "",
        email: contact?.email || "",
        note: contact?.note || ""
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();

        const trimmedName = formData.name.trim();

        if (!trimmedName) {
            return;
        }

        const savedContact = {
            id: contact?.id ?? Date.now(),
            name: trimmedName,
            phone: formData.phone.trim(),
            email: formData.email.trim(),
            note: formData.note.trim(),
            created_at: contact?.created_at ?? new Date().toISOString()
        };

        onSave(savedContact);
    }

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
            
                dark:bg-slate-900
            "
        >
            <header className="mb-4 sm:mb-7">
                <h2
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-slate-900
                    
                        sm:text-3xl
                    
                        dark:text-white
                    "
                >
                    {contact ? "Edit contact" : "Add contact"}
                </h2>

                <p
                    className="
                    mt-1
                    text-base
                    text-slate-500

                    dark:text-slate-400
                "
                >
                    Enter the contact information
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="
                max-w-3xl
                space-y-4
            "
            >
                <div>
                    <label
                        htmlFor="contact-name"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700

                            2xl:text-base

                            dark:text-slate-200
                        "
                    >
                        Name
                    </label>

                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        autoComplete="name"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2.5
                            text-base
                            text-slate-900
                            outline-none
                            transition
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                            dark:focus:border-blue-500
                            dark:focus:ring-blue-900
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-phone"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700

                            2xl:text-base

                            dark:text-slate-200
                        "
                    >
                        Phone
                    </label>

                    <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2.5
                            text-base
                            text-slate-900
                            outline-none
                            transition
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                            dark:focus:border-blue-500
                            dark:focus:ring-blue-900
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-email"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700

                            2xl:text-base

                            dark:text-slate-200
                        "
                    >
                        Email
                    </label>

                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2.5
                            text-base
                            text-slate-900
                            outline-none
                            transition
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                            dark:focus:border-blue-500
                            dark:focus:ring-blue-900
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-note"
                        className="
                            mb-2
                            block
                            text-sm
                            font-medium
                            text-slate-700

                            2xl:text-base

                            dark:text-slate-200
                        "
                    >
                        Note
                    </label>

                    <textarea
                        id="contact-note"
                        name="note"
                        rows={1}
                        value={formData.note}
                        onChange={handleChange}
                        className="
                            w-full
                            min-h-11
                            resize-y
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-2.5
                            text-base
                            leading-6
                            text-slate-900
                            outline-none
                            transition
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            sm:min-h-21

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                            dark:focus:border-blue-500
                            dark:focus:ring-blue-900
    "
                    />
                </div>

                <div className="flex flex-wrap gap-3 pt-1 sm:flex-row">
                    <button
                        type="submit"
                        className="
                            w-full
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-white
                            transition
                            hover:bg-blue-700

                            sm:w-auto
                        "
                    >
                        {contact ? "Save changes" : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            px-5
                            py-2.5
                            text-sm
                            font-medium
                            text-slate-700
                            transition
                            hover:bg-slate-100

                            sm:w-auto

                            dark:border-slate-600
                            dark:text-slate-200
                            dark:hover:bg-slate-800
                        "
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ContactForm;