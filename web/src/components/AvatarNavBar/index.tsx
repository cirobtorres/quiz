"use client";

import useUser from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import { putUserImage } from "../../libs/userImage";
import Loading from "../Loading";
import User from "../../models/User";

export default function AvatarNavBar({
  navItems,
}: {
  navItems: { title: string; href: string }[];
}) {
  const { user, logout } = useUser();
  const [imageModal, setImageModal] = useState(false);
  const pathname = usePathname();

  const handleSignOut = async () => {
    // router.push("/");
    await logout();
  };

  return (
    <>
      {user && (
        <ImageModal
          user={user}
          imageModal={imageModal}
          setImageModal={setImageModal}
        />
      )}
      <div className="w-full max-w-[20%] h-full min-h-screen flex flex-col justify-center items-center mt-20 mb-auto">
        <button
          className="relative rounded-full size-72 mb-4 overflow-hidden group"
          onClick={() => setImageModal(true)}
        >
          {user ? (
            <>
              <Image
                src={
                  user.getAvatar?.getSecureUrl ??
                  "/images/user/avatar/1281x1281-user-icon.png"
                }
                alt={`Avatar de ${user.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none border-2 border-white bg-white group-hover:opacity-50 transition ease-in duration-300"
              />
              <FaCamera
                className={`
                  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-transparent 
                  group-hover:opacity-75 group-hover:text-white group-hover:text-opacity-75 transition ease-in duration-300 text-3xl
                `}
              />
            </>
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          )}
        </button>
        <nav className="w-full flex-1 flex flex-col gap-1 mb-auto pl-10 z-10">
          {navItems.map((item, index) => {
            return (
              <div key={index} className="relative">
                <div
                  className={`absolute right-0 -top-4 after:absolute after:content-[''] after:rounded-br-full after:w-full after:h-full ml-auto mr-0 size-4 ${
                    pathname.endsWith(item.href) ? "after:bg-[#7e22ce]" : null
                  }`}
                  style={{
                    backgroundColor: pathname.endsWith(item.href)
                      ? "#cbd5e1"
                      : "transparent",
                  }}
                />
                <Link
                  href={item.href}
                  className="block text-white text-xl w-full text-start px-10 py-2 border-r-0 rounded-l-full"
                  style={{
                    color: pathname.endsWith(item.href) ? "#1e293b" : "#fff",
                    fontWeight: pathname.endsWith(item.href) ? "900" : "500",
                    backgroundColor: pathname.endsWith(item.href)
                      ? "#cbd5e1"
                      : "#7e22ce",
                  }}
                >
                  {item.title}
                </Link>
                <div
                  className={`absolute right-0 -bottom-4 z-10  after:absolute after:content-[''] after:rounded-tr-full after:w-full after:h-full ml-auto mr-0 size-4 ${
                    pathname.endsWith(item.href) ? "after:bg-[#7e22ce]" : null
                  }`}
                  style={{
                    backgroundColor: pathname.endsWith(item.href)
                      ? "#cbd5e1"
                      : "transparent",
                  }}
                />
              </div>
            );
          })}
          <Link
            href="/"
            onClick={handleSignOut}
            className="text-white text-xl w-full text-start px-10 py-2"
          >
            Sair
          </Link>
        </nav>
      </div>
    </>
  );
}

const ImageModal = ({
  user,
  imageModal,
  setImageModal,
}: {
  user: User;
  imageModal: boolean;
  setImageModal: (imageModal: boolean) => void;
}) => {
  const { refreshToken } = useUser();
  const [image, setImage] = useState<File | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setImage(event.target.files[0]);
    }
  };

  const saveImage = async (event: React.MouseEvent<HTMLElement>) => {
    setLoadingModal(true);
    event.preventDefault();
    if (image) {
      const formData = new FormData();
      formData.append("image", image);
      const mediaResponse = await putUserImage(formData);
      if (mediaResponse.public_id) {
        await refreshToken();
        setImageModal(false);
        setImage(null);
      }
    }
    setLoadingModal(false);
  };

  const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modal.current === event.target && !loadingModal) setImageModal(false);
  };

  useEffect(() => {
    if (imageModal) {
      // When the modal is shown
      document.body.style.position = "fixed";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      // When the modal is hidden
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
  }, [imageModal]);

  return (
    imageModal &&
    user && (
      <div
        ref={modal}
        className="fixed inset-0 z-[999] [background:rgba(0,0,0,0.7)]"
        onClick={handleCloseModal}
      >
        {loadingModal && (
          <div className="absolute flex justify-center items-center inset-0 z-[9999] [background:rgba(0,0,0,0.7)]">
            <Loading />
          </div>
        )}
        <div className="flex flex-col gap-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 rounded-[2rem] p-8 border border-white shadow-xl bg-slate-400">
          <div className="flex justify-between items-center">
            <span className="text-xl font-sans uppercase text-slate-800">
              Foto de Perfil
            </span>
            <button
              onClick={() => setImageModal(false)}
              disabled={loadingModal}
              className="cursor-pointer"
            >
              <IoIosClose className="text-4xl" />
            </button>
          </div>
          <h3 className="text-center text-3xl font-sans font-extrabold uppercase text-slate-800">
            {user.getUsername}
          </h3>
          <span className="text-slate-800">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            ducimus, natus quod aliquid provident sint quo rem explicabo dolore
            praesentium.
          </span>
          <div className="relative mx-auto size-60 rounded-full overflow-hidden border-2 border-white bg-white">
            <input
              type="file"
              className="absolute inset-0 cursor-pointer rounded-full opacity-0 z-50"
              onChange={handleOnChange}
            />
            {!image ? (
              <Image
                src={
                  user.getAvatar?.getSecureUrl ??
                  "/images/user/avatar/1281x1281-user-icon.png"
                }
                alt={`Avatar de ${user.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            ) : (
              <Image
                src={URL.createObjectURL(image)}
                alt={`Avatar de ${user.getUsername}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="absolute object-cover rounded-full pointer-events-none"
              />
            )}
          </div>
          <div className="flex gap-1">
            <button
              className="font-extrabold py-2 w-full rounded-xl text-blue-950 bg-blue-500 cursor-pointer"
              onClick={saveImage}
              disabled={loadingModal}
              style={{
                color: loadingModal ? "#cbd5e1" : "",
                backgroundColor: loadingModal ? "#64748b" : "",
              }}
            >
              {loadingModal ? "Salvando" : "Salvar"}
            </button>
            <button
              className="font-extrabold py-2 w-full rounded-xl text-slate-800 cursor-pointer"
              disabled={loadingModal}
            >
              Remover
            </button>
          </div>
        </div>
      </div>
    )
  );
};
