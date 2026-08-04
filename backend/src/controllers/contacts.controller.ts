import type {
    NextFunction,
    Request,
    Response,
} from "express";

import { getContacts } from "../services/contacts.service.js";

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