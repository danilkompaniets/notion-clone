"use server"

import {auth} from "@clerk/nextjs/server";
import {adminDb} from "../firebase-admin";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument() {

    const {sessionClaims, userId} = await auth();

    if (!userId) {
        throw new Error("Unauthorized")
    }

    const documentCollectionRef = adminDb.collection("documents");
    const docRef = await documentCollectionRef.add({
        title: "New Document",
    });

    await adminDb
        .collection("users")
        .doc(sessionClaims!.email)
        .collection("rooms")
        .doc(docRef.id)
        .set(
            {
                userId: sessionClaims!.email,
                role: "owner",
                createdAt: new Date(),
                roomId: docRef.id,
            },
            {merge: true}
        );

    return {docId: docRef.id};
}

export async function deleteDocument(roomId: string): Promise<{ success: boolean }> {
    auth.protect()
    console.log("deleteDocument", roomId)

    try {
        await adminDb.collection("documents").doc(roomId).delete();

        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get()

        const batch = adminDb.batch()

        query.docs.forEach((doc) => {
            batch.delete(doc.ref)
        })

        await batch.commit()

        await liveblocks.deleteRoom(roomId)

        return {success: true}
    } catch {
        console.log("Error while deleting document")
        return {success: false};
    }
}

export async function inviteUserToDocument(roomId: string, email: string) {

    auth.protect()
    try {
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId: roomId
            })

        return {success: true}
    } catch {
        console.log("Error while inviting user to document")
        return {success: false};
    }

}