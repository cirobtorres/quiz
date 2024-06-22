import { motion } from "framer-motion";

export default function ConfirmButton({ text }: { text: string }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      className="text-white font-extrabold py-2 px-3 rounded-xl outline-none bg-blue-700"
      onClick={() => console.log("Confirmar")}
    >
      {text}
    </motion.button>
  );
}
