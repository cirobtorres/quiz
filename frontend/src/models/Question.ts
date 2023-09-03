import AnswerModelFrontend from "./Response";

export default class QuestionModelFrontend {
  #id: number;
  #questionText: string;
  #arrayAnswers: AnswerModelFrontend[];
  #correctAnswer: boolean;

  constructor(
    id: number,
    questionText: string,
    arrayAnswers: AnswerModelFrontend[],
    correctAnswer: boolean = false
  ) {
    this.#id = id;
    this.#questionText = questionText;
    this.#arrayAnswers = arrayAnswers;
    this.#correctAnswer = correctAnswer;
  }

  get id() {
    return this.#id;
  }

  get questionText() {
    return this.#questionText;
  }

  get arrayAnswers() {
    return this.#arrayAnswers;
  }

  get correctAnswer() {
    return this.#correctAnswer;
  }

  get notAnswered() {
    return !this.answered;
  }

  get answered() {
    for (let answer of this.#arrayAnswers) {
      if (answer.fliped) return true;
    }
    return false;
  }

  onClickResponse(id: number): QuestionModelFrontend {
    const isTheCorrectAnswer = this.#arrayAnswers.find(
      (answer) => answer.id === id
    )?.isCorrect;
    const newAnswers = this.#arrayAnswers.map((answer) => {
      if (answer.id === id) {
        return new AnswerModelFrontend(
          answer.id,
          answer.answerText,
          answer.isCorrect,
          true
        );
      }
      if (answer.isCorrect) {
        return new AnswerModelFrontend(
          answer.id,
          answer.answerText,
          answer.isCorrect,
          true
        );
      }
      return answer;
    });
    return new QuestionModelFrontend(
      this.id,
      this.questionText,
      newAnswers,
      isTheCorrectAnswer
    );
  }

  static createAsAnObject(obj: QuestionModel): QuestionModelFrontend {
    const answers = obj.get_shuffled_answers.map((answer) =>
      AnswerModelFrontend.createAsAnObject(answer)
    );
    return new QuestionModelFrontend(obj.id, obj.question_text, answers, false);
  }
}
