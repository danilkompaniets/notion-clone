import stringToColor from "@/lib/utils";

interface FollowPointerProps {
    info: {
        name: string;
        email: string;
        avatar: string;
    };
    x: number;
    y: number;
}

export const FollowPointer = ({info, x, y}: FollowPointerProps) => {
    const color = stringToColor(info.email || "1");

    return (
        <div className={"pointer-events-none absolute top-0 left-0"}
             style={{transform: `translate(${x}px, ${y}px)`}}>
            <svg
                className="relative"
                width="24"
                height="36"
                viewBox="0 0 16 16"
                fill="none"
                stroke="white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={color}
                />
            </svg>

            <div
                className="absolute top-7 left-2 rounded-full px-2 py-1"
                style={{backgroundColor: color, borderRadius: 20}}
            >
                <p className="whitespace-nowrap text-sm leading-relaxed text-white">
                    {info.name || info.email}
                </p>
            </div>
        </div>
    );
};