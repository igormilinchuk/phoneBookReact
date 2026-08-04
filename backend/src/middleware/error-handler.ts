import type {
    ErrorRequestHandler,
} from "express";

export const errorHandler: ErrorRequestHandler = (
    error,
    _request,
    response,
    _next
) => {
    console.error(error);

    const message =
        error instanceof Error
            ? error.message
            : "Unknown server error";

    response.status(500).json({
        message: "Internal server error",
        details: message,
    });
};