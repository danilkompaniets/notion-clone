"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {FormEvent, useState, useTransition} from "react";
import {Button} from "@/components/ui/button";
import {usePathname, useRouter} from "next/navigation";
import {toast} from "sonner";
import {Input} from "@/components/ui/input";
import {inviteUserToDocument} from "../../actions/actions";


export const InviteUser = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [email, setEmail] = useState("")

    const [isPending, startTransition] = useTransition()

    const pathname = usePathname()
    const router = useRouter()


    const handleInvite = async (e: FormEvent) => {
        e.preventDefault()

        const roomId = pathname.split("/").pop()
        if (!roomId) {
            return
        }

        startTransition(async () => {
            const {success} = await inviteUserToDocument(roomId, email)
            if (success) {
                setIsOpen(false)
                setEmail("")
                toast.success("User invited")
            } else {
                toast.error("User not invited")
            }
        })
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <Button asChild={true} variant={"outline"}>
                <DialogTrigger>Invite</DialogTrigger>
            </Button>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Invite a user?</DialogTitle>
                    <DialogDescription>
                        Enter user email here!
                    </DialogDescription>
                </DialogHeader>
                <form className={"flex gap-2"} onSubmit={handleInvite}>
                    <Input type={"email"} placeholder={"email"} onChange={(e) => setEmail(e.target.value)} value={email}
                           className={"w-full"}/>
                    <Button type={"submit"} disabled={!email || isPending}>
                        {isPending ? "Inviting" : "Invite"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}