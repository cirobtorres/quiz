"use client";

import useUser from "@/hooks/useUser";
import NextImage from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaCamera, FaArrowRight } from "react-icons/fa";
import { motion, Variants } from "framer-motion";
import Loading from "../Loading";
import User from "../../models/User";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
  PercentCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import useTheme from "@/hooks/useTheme";
import { postUserImage, putUserImage } from "@/libs/users";

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function AvatarNavBar({
  navItems,
}: {
  navItems: { title: string; href: string }[];
}) {
  const { theme } = useTheme();
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
      <div className="w-full max-w-[20%] flex flex-col justify-center items-center mt-20 mb-auto">
        <button
          className="relative rounded-full w-full max-w-72 box-border p-2 mb-4 overflow-hidden group"
          onClick={() => setImageModal(true)}
        >
          {user ? (
            <>
              <NextImage
                src={
                  user.getAvatar?.getSecureUrl ??
                  "/images/user/avatar/1281x1281-user-icon.png"
                }
                alt={`Avatar de ${user.getUsername}`}
                sizes="(max-width: 768px) 100vw, 33vw"
                width={500}
                height={500}
                className="max-w-full h-auto rounded-full pointer-events-none border-2 border-white bg-white dark:bg-slate-900 group-hover:opacity-50 transition ease-in duration-300"
              />
              <FaCamera
                className={`
                  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-transparent 
                  group-hover:opacity-75 group-hover:text-white group-hover:text-opacity-75 transition ease-in duration-300 text-6xl
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
                      ? theme === "dark"
                        ? "#334155"
                        : "#cbd5e1"
                      : "transparent",
                  }}
                />
                <Link
                  href={item.href}
                  className="block text-nowrap text-base text-white w-full text-start pl-10 py-2 rounded-l-full"
                  style={{
                    color: pathname.endsWith(item.href)
                      ? theme === "dark"
                        ? "white"
                        : "#1e293b"
                      : "#fff",
                    fontWeight: pathname.endsWith(item.href) ? "900" : "500",
                    backgroundColor: pathname.endsWith(item.href)
                      ? theme === "dark"
                        ? "#334155"
                        : "#cbd5e1"
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
                      ? theme === "dark"
                        ? "#334155"
                        : "#cbd5e1"
                      : "transparent",
                  }}
                />
              </div>
            );
          })}
          <Link
            href="/"
            onClick={handleSignOut}
            className="block text-nowrap text-base text-white w-full text-start pl-10 py-2 rounded-l-full"
          >
            Sair
          </Link>
        </nav>
      </div>
    </>
  );
}
const modalVariants: Variants = {
  closed: { opacity: 0, scale: 0.9 },
  open: { opacity: 1, scale: 1 },
};

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
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [imageError, setImageError] = useState("");
  const [crop, setCrop] = useState<PercentCrop>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [loadingModal, setLoadingModal] = useState(false);
  const modal = useRef<HTMLDivElement>(null);

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    crop: PixelCrop
  ) => {
    const context = canvas.getContext("2d");
    if (!context) {
      throw new Error("Canvas context must be 2d");
    }
    // Each screen has its own pixel ratio
    // Larger screens, like 4k, got higer pixel ratios
    // If pixel ratio isn't taken into account, image might get blurried
    const pixelRatio = window.devicePixelRatio;

    // Scale adjust the image real size with the viewport image size
    // We have to adjust it for mobile screens, for instance
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    context.scale(pixelRatio, pixelRatio);
    context.imageSmoothingQuality = "high";
    context.save();

    // Set crop origin to match canvas origin (0, 0)
    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    context.translate(-cropX, -cropY);
    context.drawImage(
      image,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight,
      0,
      0,
      image.naturalWidth,
      image.naturalHeight
    );

    context.restore();
  };

  const saveImage = async (event: React.MouseEvent<HTMLElement>) => {
    setLoadingModal(true);
    event.preventDefault();

    if (imageRef.current && canvasRef.current && crop) {
      setCanvasPreview(
        imageRef.current,
        canvasRef.current,
        convertToPixelCrop(
          // Comes from react-image-crop
          crop,
          imageRef.current.width,
          imageRef.current.height
        )
      );

      const dataUrl = canvasRef.current.toDataURL();
      const formData = new FormData();

      formData.append("image", dataUrl);
      formData.append("filename", imageName);

      try {
        const mediaResponse = user.getAvatar
          ? await putUserImage(formData)
          : await postUserImage(formData);
        if (mediaResponse.public_id) {
          await refreshToken();
          setImageModal(false);
          setImage("");
        }
        // If reach here -> no public_id
      } catch (error) {
        throw error;
      }
      // If reach here -> no filename
    }
    setLoadingModal(false);
  };

  const imageInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageUrl = reader.result?.toString() || "";
      imageElement.src = imageUrl;
      imageElement.addEventListener("load", (event: Event) => {
        if (imageError) setImageError("");
        const { naturalWidth, naturalHeight } =
          event.currentTarget as HTMLImageElement;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setImageError(`Mínimo de ${MIN_DIMENSION}x${MIN_DIMENSION} pixels`);
          return setImage("");
        }
      });
      setImage(imageUrl);
      setImageName(file.name);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (event: React.ChangeEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;
    const crop = makeAspectCrop(
      // Comes from react-image-crop
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height); // Comes from react-image-crop
    setCrop(centeredCrop);
  };

  const handleCloseModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modal.current === event.target && !loadingModal && !image) {
      setImageModal(false);
      setImage("");
    }
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
        className="flex justify-center items-center fixed inset-0 z-[999] [background:rgba(0,0,0,0.7)]"
        onClick={handleCloseModal}
      >
        {loadingModal && (
          <div className="absolute flex justify-center items-center inset-0 z-[9999] [background:rgba(0,0,0,0.7)]">
            <Loading />
          </div>
        )}
        <motion.div
          initial="closed"
          animate={imageModal ? "open" : "closed"}
          variants={modalVariants}
          transition={{ duration: 0.1 }}
          className={`
            flex flex-col gap-3 
            w-auto p-8 rounded-[2rem] 
            border border-white dark:border-slate-600 shadow-xl bg-slate-200 dark:bg-slate-900
          `}
        >
          {!image && (
            <>
              <div className="w-[25rem] truncate flex justify-between items-center">
                <span className="text-xl font-sans uppercase text-slate-800 dark:text-slate-400">
                  Foto de Perfil
                </span>
                <CloseModal disabled={loadingModal} closeFunc={setImageModal} />
              </div>
              <div className="w-[25rem] inline-block text-nowrap overflow-hidden group">
                <h3
                  className={`
                    w-full block 
                    font-sans font-extrabold uppercase text-center text-3xl text-slate-800 dark:text-slate-200
                  `}
                >
                  {user.getUsername}
                </h3>
              </div>
              <div className="w-[25rem]">
                <span className="text-slate-800 dark:text-slate-400">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Veniam ducimus, natus quod aliquid provident sint quo rem
                  explicabo dolore praesentium.
                </span>
              </div>
              <div className="relative mx-auto size-96 rounded-full overflow-hidden bg-white dark:bg-slate-900">
                <input
                  type="file"
                  className="absolute inset-0 cursor-pointer rounded-full opacity-0 z-50"
                  onChange={imageInputOnChange}
                />
                <NextImage
                  src={
                    user.getAvatar?.getSecureUrl ??
                    "/images/user/avatar/1281x1281-user-icon.png"
                  }
                  alt={`Avatar de ${user.getUsername}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="absolute object-cover pointer-events-none"
                />
              </div>
              {imageError && (
                <div className="mx-auto">
                  <span className="text-red-600 text-sm">{imageError}</span>
                </div>
              )}
              {user.getAvatar && (
                <div className="mx-auto">
                  <span className="text-xs text-slate-600 dark:text-slate-400">
                    Última troca em {user.getAvatar.getUpdatedAt}
                  </span>
                </div>
              )}
            </>
          )}
          {image && (
            <div className="flex flex-col gap-4 w-[40rem]">
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setImage("")}
                  className="w-fit flex items-center gap-2 group"
                >
                  <FaArrowRight
                    style={{ rotate: "180deg" }}
                    className="text-slate-800 dark:text-slate-200 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-1"
                  />
                  <span className="text-slate-800 dark:text-slate-200 text-xl transition-all duration-200 group-hover:-translate-x-1">
                    Voltar
                  </span>
                </button>
                <CloseModal disabled={loadingModal} closeFunc={setImageModal} />
              </div>
              <ReactCrop
                crop={crop}
                onChange={(pixelCrop: PixelCrop, percentCrop: PercentCrop) =>
                  setCrop(percentCrop)
                }
                circularCrop
                keepSelection
                aspect={ASPECT_RATIO} // Perfect circular
                minWidth={MIN_DIMENSION}
                className="rounded-xl overflow-hidden border border-transparent dark:border-slate-600"
              >
                <NextImage
                  ref={imageRef}
                  src={image}
                  alt="Upload"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  width={1920}
                  height={1080}
                  onLoad={onImageLoad} // Callback once the image is load
                  style={{
                    maxHeight: "70vh",
                  }}
                />
              </ReactCrop>
              <button
                className="font-extrabold py-2 w-1/4 mx-auto rounded-xl text-white bg-blue-500 cursor-pointer"
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
                className="font-extrabold py-2 w-1/4 mx-auto rounded-xl text-slate-800 dark:text-slate-500 cursor-pointer"
                disabled={loadingModal}
              >
                Remover
              </button>
              {crop && (
                <canvas
                  ref={canvasRef}
                  style={{
                    display: "none",
                  }}
                />
              )}
            </div>
          )}
        </motion.div>
      </div>
    )
  );
};

const CloseModal = ({
  disabled,
  closeFunc,
}: {
  disabled: boolean;
  closeFunc: (bool: boolean) => void;
}) => {
  return (
    <button
      onClick={() => closeFunc(false)}
      disabled={disabled}
      className="cursor-pointer rounded-full overflow-hidden hover:bg-slate-300 dark:hover:bg-slate-600 group"
    >
      <IoIosClose className="text-slate-800 dark:text-slate-500 text-5xl group-hover:text-white dark:group-hover:text-slate-200" />
    </button>
  );
};
