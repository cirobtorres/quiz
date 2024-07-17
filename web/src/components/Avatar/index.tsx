"use client";

import { useEffect, useRef, useState } from "react";
import useUser from "../../hooks/useUser";
import SignedInAvatar from "./SignedInAvatar";
import SignedOutAvatar from "./SignedOutAvatar";
import Loading from "../Loading";

export default function Avatar() {
  const userAvatarSize = 3.5; // rem
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return; // Add a event listener only when the SignedInAvatarBox/SignedOutAvatarBox is opened
    function handleClick(event: MouseEvent) {
      if (
        dropdown.current &&
        !dropdown.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick); // Clean up
  }, [isOpen]);

  return (
    <div ref={dropdown} className="h-full flex flex-row items-center">
      {user ? (
        <SignedInAvatar
          userAvatarSize={userAvatarSize}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
        />
      ) : loading ? (
        <Loading />
      ) : (
        <SignedOutAvatar
          userAvatarSize={userAvatarSize}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}
