import getInitials from "../../utils/getInitials";

const avatarColors = [
    {
        activeBg: "bg-blue-500",
        inactiveBg: "bg-blue-500/15",
        inactiveText: "text-blue-600",
    },
    {
        activeBg: "bg-purple-500",
        inactiveBg: "bg-purple-500/15",
        inactiveText: "text-purple-600",
    },
    {
        activeBg: "bg-green-500",
        inactiveBg: "bg-green-500/15",
        inactiveText: "text-green-600",
    },
    {
        activeBg: "bg-amber-500",
        inactiveBg: "bg-amber-500/15",
        inactiveText: "text-amber-600",
    },
    {
        activeBg: "bg-pink-500",
        inactiveBg: "bg-pink-500/15",
        inactiveText: "text-pink-600",
    },
    {
        activeBg: "bg-cyan-500",
        inactiveBg: "bg-cyan-500/15",
        inactiveText: "text-cyan-600",
    },
];

function getAvatarColor(name = "") {
    let sum = 0;

    for (const letter of name) {
        sum += letter.charCodeAt(0);
    }

    return avatarColors[sum % avatarColors.length];
}

function Avatar({
                    name,
                    size = "small",
                    isActive = false,
                }) {
    const sizeClasses =
        size === "large"
            ? "h-20 w-20 text-2xl"
            : "h-10 w-10 text-sm";

    const color = getAvatarColor(name);

    return (
        <div
            className={`
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                font-bold
                ${sizeClasses}

                ${
                isActive
                    ? `${color.activeBg} text-white`
                    : `${color.inactiveBg} ${color.inactiveText}`
            }
            `}
        >
            {getInitials(name)}
        </div>
    );
}

export default Avatar;