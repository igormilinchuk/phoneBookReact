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
        <section className="flex-1 bg-white p-8 dark:bg-slate-900">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {contact ? "Edit contact" : "Add contact"}
                </h2>

                <p className="mt-1 text-slate-500 dark:text-slate-400">
                    Enter the contact information
                </p>
            </header>

            <form
                onSubmit={handleSubmit}
                className="max-w-2xl space-y-5"
            >
                <div>
                    <label
                        htmlFor="contact-name"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Name
                    </label>

                    <input
                        id="contact-name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-slate-900
                            outline-none
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-phone"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Phone
                    </label>

                    <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-slate-900
                            outline-none
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-email"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Email
                    </label>

                    <input
                        id="contact-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="
                            w-full
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-slate-900
                            outline-none
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                <div>
                    <label
                        htmlFor="contact-note"
                        className="mb-2 block font-medium text-slate-700 dark:text-slate-200"
                    >
                        Note
                    </label>

                    <textarea
                        id="contact-note"
                        name="note"
                        rows="4"
                        value={formData.note}
                        onChange={handleChange}
                        className="
                            w-full
                            resize-y
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            px-4
                            py-3
                            text-slate-900
                            outline-none
                            focus:border-blue-600
                            focus:ring-2
                            focus:ring-blue-200

                            dark:border-slate-600
                            dark:bg-slate-800
                            dark:text-white
                        "
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        className="
                            rounded-lg
                            bg-blue-600
                            px-5
                            py-3
                            font-medium
                            text-white
                            hover:bg-blue-700
                        "
                    >
                        {contact ? "Save changes" : "Save"}
                    </button>

                    <button
                        type="button"
                        onClick={onCancel}
                        className="
                            rounded-lg
                            border
                            border-slate-300
                            px-5
                            py-3
                            font-medium
                            text-slate-700
                            hover:bg-slate-100

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