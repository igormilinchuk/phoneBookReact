import type { Contact } from "../types/contact";

const CONTACTS_URL =
    "http://localhost:3001/api/contacts";

interface ApiContact {
    id: number;
    name: string;
    phone: string;
    email: string;
    note: string;
    createdAt: string;
}

export interface CreateContactInput {
    name: string;
    phone: string;
    email: string;
    note: string;
}

export interface UpdateContactInput {
    id: number;
    name: string;
    phone: string;
    email: string;
    note: string;
}

function mapApiContact(contact: ApiContact): Contact {
    return {
        id: contact.id,
        name: contact.name,
        phone: contact.phone,
        email: contact.email,
        note: contact.note,
        created_at: contact.createdAt,
    };
}

async function parseResponse<T>(
    response: Response
): Promise<T> {
    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => null);

        const message =
            errorData?.message ??
            `Request failed with status ${response.status}`;

        throw new Error(message);
    }

    return response.json() as Promise<T>;
}

export async function getContacts(): Promise<Contact[]> {
    const response = await fetch(CONTACTS_URL);

    const contacts =
        await parseResponse<ApiContact[]>(response);

    return contacts.map(mapApiContact);
}

export async function createContact(
    data: CreateContactInput
): Promise<Contact> {
    const response = await fetch(CONTACTS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const contact =
        await parseResponse<ApiContact>(response);

    return mapApiContact(contact);
}

export async function updateContact(
    data: UpdateContactInput
): Promise<Contact> {
    const response = await fetch(
        `${CONTACTS_URL}/${data.id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.name,
                phone: data.phone,
                email: data.email,
                note: data.note,
            }),
        }
    );

    const contact =
        await parseResponse<ApiContact>(response);

    return mapApiContact(contact);
}

export async function deleteContact(
    id: number
): Promise<void> {
    const response = await fetch(
        `${CONTACTS_URL}/${id}`,
        {
            method: "DELETE",
        }
    );

    if (!response.ok) {
        const errorData = await response
            .json()
            .catch(() => null);

        throw new Error(
            errorData?.message ??
            `Delete failed with status ${response.status}`
        );
    }
}