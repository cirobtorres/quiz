import { useContext } from "react";
import DarkModeContext from "../contexts/darkModeContext";

const useTheme = () => useContext(DarkModeContext);

export default useTheme;
