"use client";

import { doc, updateDoc } from "firebase/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { db } from "@/firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import Editor from "./Editor";
import UseOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUsers from "./InviteUsers";
import ManageUsers from "./ManageUsers";
import Avatars from "./Avatars";

function Document({ id }: { id: string }) {
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const isOwner = UseOwner();

  useEffect(() => {
    if (data) setInput(data.title);
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), {
          title: input,
        });
      });
    }
  };

  return (
    <div>
      <div className="flex max-w-6xl mx-auto justify-between pb-5">
        <form className="flex flex-1 space-x-2" onSubmit={updateTitle}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />

          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating" : "Update"}
          </Button>

          {isOwner && (
            <>
              <InviteUsers />
              <DeleteDocument />
            </>
          )}
        </form>
      </div>

      <div className="flex max-w-6xl mx-auto justify-between items-center mb-5">
        <ManageUsers />

        <Avatars />
      </div>

      <Editor />
    </div>
  );
}

export default Document;
