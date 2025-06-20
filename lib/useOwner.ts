"use client";

import { db } from "@/firebase";
import { useUser } from "@clerk/nextjs";
import { useRoom } from "@liveblocks/react";
import { collectionGroup, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

function UseOwner() {
  const { user } = useUser();
  const room = useRoom();
  const [isOwner, setIsOwner] = useState(false);
  const [usersInRoom] = useCollection(
    user && query(collectionGroup(db, "rooms"), where("roomId", "==", room.id))
  );

  useEffect(() => {
    if (usersInRoom?.docs && usersInRoom.docs.length > 0) {
      const owners = usersInRoom.docs.filter((doc) => {
        return doc.data().role === "owner";
      });

      if (
        owners.some((owner) => {
          return owner.data().userId === user?.emailAddresses[0].toString();
        })
      ) {
        setIsOwner(true);
      }
    }
  }, [user, usersInRoom]);

  return isOwner;
}

export default UseOwner;
