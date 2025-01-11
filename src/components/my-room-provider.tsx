"use client"

import React from "react";
import {ClientSideSuspense, RoomProvider} from "@liveblocks/react";
import {LiveList, LiveObject} from "@liveblocks/core";
import {LoadingSpinner} from "@/components/loading-spinner";
import {LiveCursorProvider} from "@/components/live-cursor-provider";

export const MyRoomProvider = ({roomId, children}: { roomId: string, children: React.ReactNode }) => {
    return (
        <RoomProvider
            initialPresence={{
                cursor: null
            }}
            id={roomId}
            initialStorage={{
                people: new LiveList([new LiveObject({name: "Marie", age: 30})])
            }}
        >
            <ClientSideSuspense fallback={<LoadingSpinner/>}>
                <LiveCursorProvider>
                    {children}
                </LiveCursorProvider>
            </ClientSideSuspense>
        </RoomProvider>
    )
}