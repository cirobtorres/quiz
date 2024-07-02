import { motion } from "framer-motion";

export default function SubmitButton({
  text,
  onSubmit,
}: {
  text: string;
  onSubmit: (event: React.MouseEvent<HTMLElement>) => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      className="flex-1 mx-auto w-full max-w-[50%] font-extrabold h-12 text-lg rounded-xl outline-none text-white bg-blue-700"
      onClick={(event) => onSubmit(event)}
    >
      {text}
    </motion.button>
  );
}
