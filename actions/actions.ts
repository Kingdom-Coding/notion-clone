"use server";

import { adminDb } from "@/firbase-admin";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import liveblocks from "@/lib/liveblocks";

export async function createNewDocument() {
  //create new doc
  const { sessionClaims, userId } = await auth();

  if (!userId)
    redirect(
      "https://hot-fly-16.accounts.dev/sign-in?redirect_url=http%3A%2F%2Flocalhost%3A3000%2F"
    );

  console.log(sessionClaims?.email);

  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Doc",
  });

  await adminDb
    .collection("users")
    // eslint-disable-next-line
    .doc(sessionClaims?.email!)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      // eslint-disable-next-line
      userId: sessionClaims?.email!,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id,
    });

  return { docId: docRef.id };
}

export async function deleteDocument(roomId: string) {
  auth.protect();

  console.log("deleted document", roomId);

  try {
    await adminDb.collection("documents").doc(roomId).delete();

    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();

    query.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    await liveblocks.deleteRoom(roomId);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function InviteUsersToDocument(roomId: string, email: string) {
  auth.protect();

  console.log("invited user to this document", roomId, email);

  try {
    adminDb.collection("users").doc(email).collection("rooms").doc(roomId).set({
      userId: email,
      role: "editor",
      createdAt: new Date(),
      roomId,
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  auth.protect();

  console.log(
    "you have successfully removed a user from the document",
    roomId,
    email
  );

  try {
    adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
}
