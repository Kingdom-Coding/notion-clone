"use client";

import {
  RoomProvider as RoomProviderWrapper,
  ClientSideSuspense,
} from "@liveblocks/react";

function RoomProvider({
  roomId,
  children,
}: {
  roomId: string;
  children: React.ReactNode;
}) {
  return (<RoomProviderWrapper
    id={roomId} 
    initialPresence={{
        cursor: null
    }}
  >{children}</RoomProviderWrapper>;
})

export default RoomProvider;
