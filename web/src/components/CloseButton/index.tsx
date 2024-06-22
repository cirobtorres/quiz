import { motion } from "framer-motion";

export default function CloseButton({
  color,
  size,
  closeFunction,
}: {
  color?: string;
  size?: string;
  closeFunction: (value: boolean) => void;
}) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 1 }}
      whileHover={{ scale: 1.15 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
      onClick={() => closeFunction(false)}
      className="flex items-center justify-center mr-4"
    >
      <motion.svg
        stroke="currentColor"
        fill="transparent"
        stroke-width="35"
        viewBox="0 0 512 512"
        className={`
          ${!color ? "text-crimson" : color} ${!size ? "text-2xl" : size}`}
        height="1.25em"
        width="1.25em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          initial={{ pathLength: 0, pathOffset: 1 }}
          animate={{ pathLength: 1, pathOffset: 0 }}
          transition={{
            // repeat: Infinity,
            // repeatType: "mirror",
            ease: "easeInOut",
            from: 0,
            repeatDelay: 0,
            duration: 4,
            delay: 0,
          }}
          d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm52.7 283.3L256 278.6l-52.7 52.7c-6.2 6.2-16.4 6.2-22.6 0-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3l52.7-52.7-52.7-52.7c-3.1-3.1-4.7-7.2-4.7-11.3 0-4.1 1.6-8.2 4.7-11.3 6.2-6.2 16.4-6.2 22.6 0l52.7 52.7 52.7-52.7c6.2-6.2 16.4-6.2 22.6 0 6.2 6.2 6.2 16.4 0 22.6L278.6 256l52.7 52.7c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"
        />
      </motion.svg>
    </motion.button>
  );
}
