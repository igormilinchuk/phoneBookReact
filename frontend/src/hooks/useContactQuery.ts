import { useQuery } from "@tanstack/react-query";

import { getContactById } from "../api/contactsApi";

export function useContactQuery(
    id: number | null
) {
    return useQuery({
        queryKey: ["contacts", id],

        queryFn: () =>
            getContactById(id!),

        enabled: id !== null,
    });
}