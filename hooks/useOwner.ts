import {useUser} from "@clerk/nextjs";
import {useRoom} from "@liveblocks/react";
import {useEffect, useState} from "react";
import {useCollection} from "react-firebase-hooks/firestore";
import {collectionGroup, query, where} from "firebase/firestore";
import {db} from "../firebase";

export const useOwner = () => {
    const {user} = useUser()
    const room = useRoom()
    const [isOwner, setIsOwner] = useState<boolean>(false)
    const [usersInRoom] = useCollection(
        user && query(
            collectionGroup(db, "rooms"),
            where("roomId", "==", room.id)
        )
    )

    useEffect(() => {
        if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
            const owners = usersInRoom.docs.filter((doc) => {
                return doc.data().role === "owner"
            })

            if (
                owners.some((owner) => owner.data().userId === user?.emailAddresses[0].toString())
            ) {
                setIsOwner(true)
            }

        }

    }, [usersInRoom, user]);

    return isOwner

}