import stringToColor from "@/lib/utils";
import {motion} from "framer-motion";

interface FollowPointerProps {
    info: {
        name: string
        email: string
        avatar: string
    },
    x: number,
    y: number
}

export const FollowPointer = ({info, x, y}: FollowPointerProps) => {
    const color = stringToColor(info.email || "1")

    return (
        <motion.div
            className={"h-4 w-4 rounded-full absolute z-50"}

            style={{
                top: y,
                left: x,
                pointerEvents: "none"
            }}
            initial={{
                scale: 1,
                opacity: 1
            }}
            animate={{
                scale: 1,
                opacity: 1
            }}
            exit={{
                scale: 0,
                opacity: 0
            }}
        >
            <svg
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    transform: `translateX(${x}px) translateY(${y}px)`,
                }}
                className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
                stroke={color}
                fill={color}
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
                    fill={color}
                />
            </svg>

            <motion.div
                style={{
                    backgroundColor: color
                }}

                initial={{
                    scale: 0.5,
                    opacity: 0
                }}

                animate={{
                    scale: 1,
                    opacity: 1
                }}

                exit={{
                    scale: 0.5,
                    opacity: 0
                }}

                className={"px-2 py-2 bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full"}
            >
                {info?.name || info.email}
            </motion.div>
        </motion.div>
    )
}