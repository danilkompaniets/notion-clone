import {Input} from "@/components/ui/input";
import {useEffect, useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useDocumentData} from "react-firebase-hooks/firestore";

export const Document = ({id}: { id: string }) => {
    const [input, setInput] = useState("")
    const [isUpdating, startTransition] = useTransition()
    const [data, loading, error] = useDocumentData(doc(db, "documents", id))

    useEffect(() => {

    }, [data])

    const updateTitle = (e) => {
        e.preventDefault();

        if (input.trim()) {
            startTransition(async () => {
                await updateDoc(doc(db, "documents", id), {
                    title: input
                })
            })
        }
    }

    return (
        <div>
            <div className={"flex max-w-6xl mx-auto justify-between pb-5"}>
                <form className={"flex flex-1 space-x-2"} onSubmit={updateTitle}>
                    <Input value={input} onChange={(e) => setInput(e.target.value)}/>

                    <Button disabled={isUpdating} type={"submit"}>
                        {isUpdating ? "Updating..." : "Update"}
                    </Button>
                </form>
            </div>
            <div>
                {/* Manage users */}

                {/* Avatars */}
            </div>
            {/* Collaborative editor */}
        </div>
    )
}