function getInitials(fullName) {
    return fullName
        .trim()
        .split(/\s+/)
        .slice(0, 2)
        .map(word => word.charAt(0).toUpperCase())
        .join("");
}

export default getInitials;