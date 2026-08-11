import { prisma } from "../lib/prisma.js";

import type { CreateContactInput } from
        "../types/create-contact.js";

import type { UpdateContactInput } from
        "../types/update-contact.js";

export async function getContacts() {
    return prisma.contact.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export async function getContactById(id: number) {
    return prisma.contact.findUnique({
        where: {
            id,
        },
    });
}

export async function createContact(
    data: CreateContactInput
) {
    return prisma.contact.create({
        data: {
            name: data.name,
            phone: data.phone ?? "",
            email: data.email ?? "",
            note: data.note ?? "",
        },
    });
}

export async function updateContact(
    id: number,
    data: UpdateContactInput
) {
    return prisma.contact.update({
        where: {
            id,
        },
        data,
    });
}

export async function deleteContact(id: number) {
    return prisma.contact.delete({
        where: {
            id,
        },
    });
}