"use client"

import {Button} from "@/components/ui/button";
import {useTransition} from "react";

import {createNewDocument} from "../../actions/actions";
import {useRouter} from "next/navigation";

export const NewDocumentButton = () => {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const handleCreateNewDocument = () => {
        startTransition(async () => {
            const {docId} = await createNewDocument()
            router.push(`/doc/${docId}`)
        })
    }
    return (
        <div>
            <Button disabled={isPending} onClick={handleCreateNewDocument}>
                {isPending ? "Creating..." : "New Document"}
            </Button>
        </div>
    )
}