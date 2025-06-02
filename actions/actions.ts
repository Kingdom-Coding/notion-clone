"use server";

import { adminDb } from "@/firbase-admin";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

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
