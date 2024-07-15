import Image from "next/image";
import Link from "next/link";
import { FaGear } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoExitOutline } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";
import { FaCamera } from "react-icons/fa";
import useUser from "../../../hooks/useUser";
import User from "../../../models/User";
import { listVariants, itemVariants } from "../avatarVariants";

export default function SignedInAvatar({
  userAvatarSize,
  isOpen,
  setIsOpen,
  user,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User;
}) {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      className="relative flex items-center shadow-xl rounded-full"
    >
      <div
        className={"rounded-full"} // ${user.getAvatar?.getSecureUrl ? "bg-gradient-to-tr from-pink-500 to-yellow-500" : "bg-white"} p-[2px]
        style={{
          width: `${userAvatarSize}rem`,
          height: `${userAvatarSize}rem`,
        }}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full w-full h-full bg-white overflow-hidden"
        >
          <Image
            src={
              user.getAvatar?.getSecureUrl ??
              "/images/user/avatar/1281x1281-user-icon.png"
            }
            alt="Imagem to usuário"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute object-cover"
          />
        </button>
      </div>
      <SignedInAvatarBox
        userAvatarSize={userAvatarSize}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        user={user}
      />
    </motion.div>
  );
}

const SignedInAvatarBox = ({
  userAvatarSize,
  isOpen,
  setIsOpen,
  user,
}: {
  userAvatarSize: number;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  user: User;
}) => {
  const { logout } = useUser();
  const signedInAvatarBoxWidth = 24; // rem
  // const calcLeftDeslocation = signedInAvatarBoxWidth / 2 - userAvatarSize / 2; // Aligned center with upper rounded avatar box
  const calcLeftDeslocation = signedInAvatarBoxWidth - userAvatarSize; // Aligned left

  const left = `-${calcLeftDeslocation}rem`;
  const width = `${signedInAvatarBoxWidth}rem`;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <motion.div
      variants={listVariants}
      style={{
        pointerEvents: isOpen ? "auto" : "none",
        width: width,
        left: left,
      }}
      layout
      className="w-96 absolute top-[140%] overflow-hidden rounded-3xl border border-white bg-slate-200"
    >
      <motion.div variants={itemVariants} className="flex p-2">
        <span className="flex-1 ml-10 text-center">{user.getEmail}</span>
        <button onClick={() => setIsOpen(!isOpen)}>
          <IoIosClose strokeWidth={20} size={25} />
        </button>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex justify-center bg-gradient-to-tr from-pink-500 to-yellow-500 p-[2px]"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full w-28 h-28 relative overflow-hidden transition ease-in duration-300 group"
        >
          <Image
            src={
              user.getAvatar?.getSecureUrl ??
              "/images/user/avatar/1281x1281-user-icon.png"
            }
            alt="Imagem to usuário"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="absolute object-cover group-hover:opacity-50 transition ease-in duration-300"
          />
          <FaCamera
            className={`
                  absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none text-transparent 
                  group-hover:opacity-75 group-hover:text-white group-hover:text-opacity-75 transition ease-in duration-300 text-3xl
                `}
          />
        </button>
      </motion.div>
      <motion.div variants={itemVariants} className="text-center my-2">
        <h3 className="text-xl">
          Olá, <strong>{user.getUsername}!</strong>
        </h3>
      </motion.div>
      <motion.div variants={itemVariants} className="flex justify-center">
        <Link
          href={`/${user.getUsername}/pontuacao`}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-blue-500 text-white rounded-full w-fit px-4 py-2"
        >
          Pontuação
        </Link>
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="w-3/4 flex mx-auto gap-1 m-4 mb-10"
      >
        <Link
          href={`/${user.getUsername}/perfil`}
          className="w-full flex-1 flex justify-center gap-2 p-4 rounded-l-full border border-slate-300 transition-all duration-200 bg-slate-300 hover:bg-slate-200" // group
        >
          Perfil{" "}
          <div className="w-6 h-6 relative">
            <FaGear
              size={16}
              className="absolute bottom-0 left-0 animate-spin-slow-clockwise" // group-hover:animate-spin-slow-clockwise
            />
            <FaGear
              size={13}
              className="absolute top-0 right-0 animate-spin-slow-counterclockwise" // group-hover:animate-spin-slow-counterclockwise
            />
          </div>
        </Link>
        <Link
          type="button"
          href="/"
          onClick={handleLogout}
          className="w-full flex-1 flex items-center gap-2 text-center p-4 rounded-r-full border border-slate-300 transition-all duration-200 bg-slate-300 hover:bg-slate-200"
        >
          <IoExitOutline size={25} /> Sair
        </Link>
      </motion.div>
    </motion.div>
  );
};
