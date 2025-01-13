import {useMyPresence, useOthers} from "@liveblocks/react";
import React, {PointerEvent} from "react";
import {FollowPointer} from "@/components/follow-pointer";

export const LiveCursorProvider = ({children}: { children: React.ReactNode }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, updateMyPresence] = useMyPresence()
    const others = useOthers(user => user)


    function handlerPointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = {x: Math.floor(e.pageX), y: Math.floor(e.pageY)}
        updateMyPresence({cursor})
    }

    function handlerPointerLeave() {
        updateMyPresence({cursor: null})
    }

    return (
        <div
            onPointerLeave={handlerPointerLeave}
            onPointerMove={handlerPointerMove}
        >
            {others.filter((other) => {
                return other.presence.cursor !== null
            }).map(({connectionId, presence, info}) => (
                <FollowPointer
                    key={connectionId}
                    info={info}
                    x={presence.cursor!.x}
                    y={presence.cursor!.y}
                />
            ))}
            {children}
        </div>
    )
}