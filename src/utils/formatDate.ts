export default function formatDate(dateString?: string) {
    if (!dateString) {
        return "";
    }

    return new Date(dateString).toLocaleDateString(
        "en-GB",
        {
            day: "numeric",
            month: "short",
        }
    );
}