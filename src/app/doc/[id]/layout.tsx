import {auth} from "@clerk/nextjs/server";
import {MyRoomProvider} from "@/components/my-room-provider";
import React from "react";


const DocLayout = async (props: { children: React.ReactNode, params: Promise<{ id: string }> }) => {
    const params = await props.params;

    const {
        children
    } = props;

    auth.protect()
    return (
        <MyRoomProvider roomId={params.id}>
            {children}
        </MyRoomProvider>
    )
}

export default DocLayout;