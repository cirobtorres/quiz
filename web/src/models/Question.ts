import Answer from "./Answer";

export default class Question {
  private id: number; // 1. The 'number' id of a question.
  private quizId: number; // 2. The 'number' id of the respective quiz to which this question belongs.
  private text: string; // 3. The 'string' text of the question statement.
  private shuffledAnswers: Answer[]; // 4. An 'array' of four randomly shuffled answer instances.
  private selected?: boolean; // 5. A 'boolean' indicating whether the question was answered or not.

  constructor(
    id: number,
    quizId: number,
    text: string,
    shuffledAnswers: Answer[],
    selected: boolean = false
  ) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.shuffledAnswers = shuffledAnswers;
    this.selected = selected;
  }

  get getId() {
    return this.id;
  }

  get getQuizId() {
    return this.quizId;
  }

  get getText() {
    return this.text;
  }

  get getShuffledAnswers() {
    return this.shuffledAnswers;
  }

  get getSelected() {
    return this.selected;
  }

  get getNotAnswered() {
    return !this.getAnswered;
  }

  get getAnswered() {
    for (let answer of this.getShuffledAnswers) {
      if (answer.getFlipped) return true;
    }
    return false;
  }

  onClick(id: number) {
    const selected = this.getShuffledAnswers.find(
      (answer) => answer.getId === id
    )?.getIsCorrect; // Returns a boolean: true if user has selected the correct answer
    const flippedCards = this.getShuffledAnswers.map((answer) => {
      // Flips the chosen card
      if (answer.getId === id) {
        return new Answer(
          answer.getId,
          answer.getText,
          answer.getIsCorrect,
          true
        );
      }
      // Flips the correct card
      if (answer.getIsCorrect) {
        return new Answer(
          answer.getId,
          answer.getText,
          answer.getIsCorrect,
          true
        );
      }
      return answer; // Do not flip the remaining cards
    });
    const question = new Question(
      this.getId,
      this.getQuizId,
      this.getText,
      flippedCards, // New shuffledAnswers is now the flipped cards
      selected
    );
    return question;
  }

  static create(obj: QuestionAPI) {
    const answers = obj.get_shuffled_answers.map((answer) => {
      return Answer.create(answer);
    });
    return new Question(obj.id, obj.quiz_id, obj.text, answers, false);
  }
}
