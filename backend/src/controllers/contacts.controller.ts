import type {
    NextFunction,
    Request,
    Response,
} from "express";

import {
    createContact,
    deleteContact,
    getContactById,
    getContacts,
    updateContact,
} from "../services/contacts.service.js";

import type { UpdateContactInput } from
        "../types/update-contact.js";

import type { CreateContactInput } from
        "../types/create-contact.js";

interface ContactParams {
    id: string;
}

export async function getContactsController(
    _request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const contacts = await getContacts();

        response.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

export async function getContactByIdController(
    request: Request<ContactParams>,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            response.status(400).json({
                message: "Invalid contact id",
            });

            return;
        }

        const contact = await getContactById(id);

        if (!contact) {
            response.status(404).json({
                message: "Contact not found",
            });

            return;
        }

        response.status(200).json(contact);
    } catch (error) {
        next(error);
    }
}

export async function createContactController(
    request: Request<
        Record<string, never>,
        unknown,
        CreateContactInput
    >,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const {
            name,
            phone,
            email,
            note,
        } = request.body;

        const trimmedName = name?.trim();

        if (!trimmedName) {
            response.status(400).json({
                message: "Name is required",
            });

            return;
        }

        const contact = await createContact({
            name: trimmedName,
            phone: phone?.trim() ?? "",
            email: email?.trim() ?? "",
            note: note?.trim() ?? "",
        });

        response.status(201).json(contact);
    } catch (error) {
        next(error);
    }
}

export async function updateContactController(
    request: Request<
        ContactParams,
        unknown,
        UpdateContactInput
    >,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            response.status(400).json({
                message: "Invalid contact id",
            });

            return;
        }

        const existingContact =
            await getContactById(id);

        if (!existingContact) {
            response.status(404).json({
                message: "Contact not found",
            });

            return;
        }

        const {
            name,
            phone,
            email,
            note,
        } = request.body;

        if (
            name === undefined &&
            phone === undefined &&
            email === undefined &&
            note === undefined
        ) {
            response.status(400).json({
                message: "No fields provided for update",
            });

            return;
        }

        const trimmedName = name?.trim();

        if (name !== undefined && !trimmedName) {
            response.status(400).json({
                message: "Name cannot be empty",
            });

            return;
        }

        const updatedContact =
            await updateContact(id, {
                ...(trimmedName !== undefined && {
                    name: trimmedName,
                }),
                ...(phone !== undefined && {
                    phone: phone.trim(),
                }),
                ...(email !== undefined && {
                    email: email.trim(),
                }),
                ...(note !== undefined && {
                    note: note.trim(),
                }),
            });

        response.status(200).json(
            updatedContact
        );
    } catch (error) {
        next(error);
    }
}

export async function deleteContactController(
    request: Request<ContactParams>,
    response: Response,
    next: NextFunction
): Promise<void> {
    try {
        const id = Number(request.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            response.status(400).json({
                message: "Invalid contact id",
            });

            return;
        }

        const existingContact =
            await getContactById(id);

        if (!existingContact) {
            response.status(404).json({
                message: "Contact not found",
            });

            return;
        }

        await deleteContact(id);

        response.status(204).send();
    } catch (error) {
        next(error);
    }
}