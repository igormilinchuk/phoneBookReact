import getInitials from "../../utils/getInitials";

function Avatar({ name, size = "small" }) {
    const sizeClasses =
        size === "large"
            ? "h-20 w-20 text-2xl"
            : "h-12 w-12 text-base";

    return (
        <div
            className={`
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-blue-600
                font-bold
                text-white
                ${sizeClasses}
            `}
        >
            {getInitials(name)}
        </div>
    );
}

export default Avatar;