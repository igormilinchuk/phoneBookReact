import { Router } from "express";

import {
    createContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    updateContactController,
} from "../controllers/contacts.controller.js"

const contactsRouter = Router();

contactsRouter.get(
    "/",
    getContactsController
);

contactsRouter.get(
    "/:id",
    getContactByIdController
);

contactsRouter.post(
    "/",
    createContactController
);

contactsRouter.patch(
    "/:id",
    updateContactController
);

contactsRouter.delete(
    "/:id",
    deleteContactController
)

export default contactsRouter;