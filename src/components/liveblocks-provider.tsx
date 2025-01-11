"use client"

import React from 'react';
import {LiveblocksProvider} from "@liveblocks/react";

const LiveblocksProvider = ({children}: { children: React.ReactNode }) => {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not provided")
    }
    return (
        <LiveblocksProvider throttle={16} authEndpoint={"/auth-endpoint"}>
            {children}
        </LiveblocksProvider>
    );
};

export default LiveblocksProvider;