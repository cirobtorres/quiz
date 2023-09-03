import { useContext } from "react";
import QuizUserContext from "@context/QuizUserContext";

const useQuizUser = () => useContext(QuizUserContext);

export default useQuizUser;
