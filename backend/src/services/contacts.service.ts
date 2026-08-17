import {
    asc,
    eq,
} from "drizzle-orm";

import { db } from "../db/index.js";
import { contacts } from "../db/schema.js";

import type { CreateContactInput } from
        "../types/create-contact.js";

import type { UpdateContactInput } from
        "../types/update-contact.js";

export async function getContacts() {
    return db
        .select()
        .from(contacts)
        .orderBy(asc(contacts.name));
}

export async function getContactById(id: number) {
    const [contact] = await db
        .select()
        .from(contacts)
        .where(eq(contacts.id, id));

    return contact ?? null;
}

export async function createContact(
    data: CreateContactInput
) {
    const [contact] = await db
        .insert(contacts)
        .values({
            name: data.name,
            phone: data.phone ?? "",
            email: data.email ?? "",
            note: data.note ?? "",
        })
        .returning();

    return contact;
}

export async function updateContact(
    id: number,
    data: UpdateContactInput
) {
    const [contact] = await db
        .update(contacts)
        .set(data)
        .where(eq(contacts.id, id))
        .returning();

    return contact;
}

export async function deleteContact(id: number) {
    const [contact] = await db
        .delete(contacts)
        .where(eq(contacts.id, id))
        .returning();

    return contact;
}