import React from 'react';
import MyLiveblocksProvider from "@/components/liveblocks-provider";

const Layout = ({children}: { children: React.ReactNode }) => {
    return (
        <MyLiveblocksProvider>
            {children}
        </MyLiveblocksProvider>
    );
};

export default Layout;