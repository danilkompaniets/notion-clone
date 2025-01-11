import React from 'react';
import LiveblocksProvider from "@/components/liveblocks-provider";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <LiveblocksProvider>
            {children}
        </LiveblocksProvider>
    );
};

export default Layout;