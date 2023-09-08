import { useContext } from "react";
import QuizSettingsContext from "@context/QuizSettings";

const useQuizSettings = () => useContext(QuizSettingsContext);

export default useQuizSettings;
