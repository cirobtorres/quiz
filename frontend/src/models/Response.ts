export default class AnswerModelFrontend {
  #id: number;
  #answerText: string;
  #isCorrect: boolean;
  #fliped: boolean;

  constructor(
    id: number,
    answerText: string,
    isCorrect: boolean,
    fliped = false
  ) {
    this.#id = id;
    this.#answerText = answerText;
    this.#isCorrect = isCorrect;
    this.#fliped = fliped;
  }

  static createAsAnObject(obj: AnswerModel): AnswerModelFrontend {
    return new AnswerModelFrontend(obj.id, obj.answer_text, obj.is_correct);
  }

  get id() {
    return this.#id;
  }

  get answerText() {
    return this.#answerText;
  }

  get isCorrect() {
    return this.#isCorrect;
  }

  get fliped() {
    return this.#fliped;
  }
}
