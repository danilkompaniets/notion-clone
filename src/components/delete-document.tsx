"use client"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {deleteDocument} from "../../actions/actions";
import {toast} from "sonner";


export const DeleteDocument = () => {
    const [isOpen, setIsOpen] = useState(false)

    const [isPending, startTransition] = useTransition()

    const pathname = usePathname()
    const router = useRouter()


    const handleDelete = async () => {
        const roomId = pathname.split("/").pop()
        if (!roomId) {
            return
        }

        startTransition(async () => {
            const {success} = await deleteDocument(roomId)


            if (success) {
                setIsOpen(false)
                router.replace("/")
                toast.success("Document Deleted succesfully")
            } else {
                toast.error("Document Delete failed")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild={true} variant={"destructive"}>
                <DialogTrigger>Delete</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure you want to delete this file?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this page and remove your data from
                        our servers.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className={"sm:justify-end gap-2"}>
                    <Button
                        type={"button"}
                        variant={"destructive"}
                        onClick={handleDelete}
                        disabled={isPending}
                    >
                        {isPending ? "Deleting" : "Delete"}
                    </Button>
                    <DialogClose asChild={true}>
                        <Button type={"button"} variant={"secondary"}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}