import {useSelf} from "@liveblocks/react/suspense";
import {useRoom} from "@liveblocks/react";
import {useEffect, useState} from "react";
import * as Y from "yjs";
import {LiveblocksYjsProvider} from "@liveblocks/yjs";
import {BlockNoteView} from "@blocknote/shadcn";
import {BlockNoteEditor} from "@blocknote/core";
import {useCreateBlockNote} from "@blocknote/react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import stringToColor from "@/lib/utils";
import {TranslateDocument} from "@/components/translate-document";

type EditorProps = {
    doc: Y.Doc;
    provider: LiveblocksYjsProvider;
};

const BlockNote = ({doc, provider}: EditorProps) => {
    const userInfo = useSelf((me) => me.info);

    const editor: BlockNoteEditor = useCreateBlockNote({
        collaboration: {
            provider,
            fragment: doc.getXmlFragment("document-store"),
            user: {
                name: userInfo.name || "Anonymous", // Fallback to "Anonymous" if name is not available
                color: stringToColor(userInfo.email),
            },
        },
    });


    return (
        <div className="relative max-w-6xl mx-auto">
            <BlockNoteView className="min-h-screen" editor={editor} theme="light"/>
        </div>
    );
};

export const Editor = () => {
    const room = useRoom();
    const [doc, setDoc] = useState<Y.Doc | null>(null);
    const [provider, setProvider] = useState<LiveblocksYjsProvider | null>(null);

    useEffect(() => {
        if (!room) {
            console.error("Room is not initialized. Check Liveblocks configuration.");
            return;
        }

        const yDoc = new Y.Doc();
        const yProvider = new LiveblocksYjsProvider(room, yDoc);

        setDoc(yDoc);
        setProvider(yProvider);


        return () => {
            yDoc.destroy();
            yProvider.destroy();
        };
    }, [room]);

    if (!doc || !provider) {
        return <div>Loading collaborative editor...</div>;
    }


    return (
        <div className="max-w-6xl mx-auto  flex-1 h-full bg-white p-5">
            <div className="flex items-center gap-2 justify-end mb-10">
                <TranslateDocument doc={doc}/>
            </div>

            <BlockNote doc={doc} provider={provider}/>
        </div>
    );
};