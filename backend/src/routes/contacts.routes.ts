import { Router } from "express";

import {
    getContactsController,
} from "../controllers/contacts.controller.js";

const contactsRouter = Router();

contactsRouter.get(
    "/",
    getContactsController
);

export default contactsRouter;