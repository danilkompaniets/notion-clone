import {auth} from "@clerk/nextjs/server";
import {MyRoomProvider} from "@/components/my-room-provider";
import React from "react";


const DocLayout = ({children, params}: { children: React.ReactNode, params: { id: string } }) => {
    auth.protect()
    return (
        <MyRoomProvider roomId={params.id}>
            {children}
        </MyRoomProvider>
    )
}

export default DocLayout;