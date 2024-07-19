"use client";

import { useRef, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";

export default function Search() {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = (event: React.MouseEvent) => {
    event.preventDefault();
    setSearch("");
    inputRef.current?.focus();
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <form className="w-full max-w-[40rem] mx-auto">
      <div
        className={`
          relative h-full w-full rounded-full shadow-md border border-transparent 
          bg-white dark:border-slate-600 dark:bg-slate-700
        `}
      >
        <button type="button" onClick={handleClose}>
          <IoClose className="absolute top-1/2 -translate-y-1/2 left-4 size-5 text-slate-400" />
        </button>
        <input
          ref={inputRef}
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-full text-xl text-slate-800 dark:text-slate-200 w-full px-12 py-4 border-none outline-none bg-transparent"
        />
        <button type="submit" onClick={handleSubmit}>
          <IoIosSearch className="absolute top-1/2 -translate-y-1/2 right-4 size-6 text-slate-400" />
        </button>
      </div>
    </form>
  );
}
