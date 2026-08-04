import type { Contact } from "../types/contact.js";
import type { JsonPlaceholderUser } from "../types/json-placeholder-user.js";

const JSON_PLACEHOLDER_USERS_URL =
    "https://jsonplaceholder.typicode.com/users";

export async function getContacts(): Promise<Contact[]> {
    const response = await fetch(
        JSON_PLACEHOLDER_USERS_URL
    );

    if (!response.ok) {
        throw new Error(
            `Failed to fetch contacts: ${response.status}`
        );
    }

    const users =
        await response.json() as JsonPlaceholderUser[];

    return users.map((user) => ({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        note: `${user.company.name}, ${user.address.city}`,
        created_at: createContactDate(user.id),
    }));
}

function createContactDate(id: number): string {
    const date = new Date("2026-01-01T00:00:00.000Z");

    date.setDate(date.getDate() + id);

    return date.toISOString();
}