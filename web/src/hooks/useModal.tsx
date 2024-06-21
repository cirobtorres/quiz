import { useContext } from "react";
import ModalContext from "../contexts/modalContext";

const useModal = () => useContext(ModalContext);

export default useModal;
