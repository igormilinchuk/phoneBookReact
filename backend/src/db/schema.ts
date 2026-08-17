import {
    integer,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";

export const contacts = sqliteTable("contacts", {
    id: integer("id")
        .primaryKey({
            autoIncrement: true,
        }),

    name: text("name")
        .notNull(),

    phone: text("phone")
        .notNull()
        .default(""),

    email: text("email")
        .notNull()
        .default(""),

    note: text("note")
        .notNull()
        .default(""),

    createdAt: text("created_at")
        .notNull()
        .$defaultFn(() => new Date().toISOString()),
});