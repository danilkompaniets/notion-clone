"use client";

import {NewDocumentButton} from "@/components/new-document-button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {MenuIcon} from "lucide-react";
import {useCollection} from "react-firebase-hooks/firestore";
import {useUser} from "@clerk/nextjs";
import {collectionGroup, DocumentData, query, where} from "firebase/firestore";
import {db} from "../../firebase";
import {useEffect, useState} from "react";
import {SidebarOption} from "@/components/sidebar-option";

export const Sidebar = () => {
    interface RoomDocument extends DocumentData {
        createdAt: string;
        role: "owner" | "editor";
        roomId: string;
        userId: string;
    }

    const [groupedData, setGroupData] = useState<{
        owner: RoomDocument[];
        editor: RoomDocument[];
    }>({
        owner: [],
        editor: [],
    });

    const {user} = useUser();
    const [data, loading, error] = useCollection(
        user && query(
            collectionGroup(db, "rooms"),
            where("userId", "==", user.emailAddresses[0]?.emailAddress || "")
        )
    );

    useEffect(() => {
        if (!data) return;

        const grouped = data.docs.reduce(
            (acc, curr) => {
                const roomData = curr.data() as RoomDocument;
                if (roomData.role === "owner") {
                    acc.owner.push({id: curr.id, ...roomData});
                } else {
                    acc.editor.push({id: curr.id, ...roomData});
                }
                return acc;
            },
            {owner: [], editor: []} as typeof groupedData
        );

        setGroupData(grouped);
    }, [data]);

    if (!user) {
        return <div>Please log in.</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading documents: {error.message}</div>;
    }

    const menuOptions = (
        <div className={"flex flex-col w-full"}>
            <NewDocumentButton/>
            <div className="flex py-4 flex-col space-y-4 md:max-w-36">
                {groupedData.owner.length === 0 ? (
                    <h2 className="text-gray-500 font-semibold text-sm">No documents found</h2>
                ) : (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">My Documents</h2>
                        {groupedData.owner.map((doc) => (
                            <SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id}/>
                        ))}
                    </>
                )}
            </div>

            <div className="flex py-4 flex-col space-y-4  md:max-w-36">
                {groupedData.editor.length > 0 && (
                    <>
                        <h2 className="text-gray-500 font-semibold text-sm">Shared Documents</h2>
                        {groupedData.editor.map((doc) => (
                            <SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id}/>
                        ))}
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="p-2 md:p-4 bg-gray-200/10 relative">
            {/* Mobile View */}
            <div className="md:hidden">
                <Sheet>
                    <SheetTrigger>
                        <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40}/>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle>Menu</SheetTitle>
                            {menuOptions}
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Desktop View */}
            <div className="hidden md:inline">{menuOptions}</div>
        </div>
    );
};