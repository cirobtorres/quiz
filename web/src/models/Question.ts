import Answer from "./Answer";

export default class Question {
  private id: number; // 1. 'number' id of this question
  private quizId: number; // 2. 'number' id of the respective quiz to which this question belongs
  private text: string; // 3. 'string' text containing the question statement
  private shuffledAnswers: Answer[]; // 4. 'array' of four randomly shuffled answer instances
  private selected?: boolean; // 5. true if answer card chosen by user was the correct one; false otherwise

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
    // True if user has chosen the correct card; false otherwise
    return this.selected;
  }

  get getAnswered() {
    // ALWAYS TRUE if user has already answered this question, correct or not
    for (let answer of this.getShuffledAnswers) {
      if (answer.getFlipped) return true;
    }
    return false;
  }

  onClick(answerId: number) {
    const selected = this.getShuffledAnswers.find(
      (answer) => answer.getId === answerId
    )?.getIsCorrect; //Returns true if answerId matches the correct answer card; false otherwise
    const flippedCards = this.getShuffledAnswers.map((answer) => {
      // Flips the chosen card
      if (answer.getId === answerId) {
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

  static create(obj: QuestionProps) {
    const answers = obj.get_shuffled_answers.map((answer) => {
      return Answer.create(answer);
    });
    return new Question(obj.id, obj.quiz_id, obj.text, answers, false);
  }
}
