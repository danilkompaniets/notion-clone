"use server"

import {auth} from "@clerk/nextjs/server";
import {adminDb} from "../firebase-admin";

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