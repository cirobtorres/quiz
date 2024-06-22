import { motion } from "framer-motion";

export default function ConfirmButton({ text }: { text: string }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      className="flex-1 font-extrabold h-14 text-lg rounded-xl outline-none text-white bg-blue-700"
      onClick={() => console.log("Confirmar")}
    >
      {text}
    </motion.button>
  );
}
