import Answer from "./Answer";

export default class Question {
  // This Question instance stores the following attributes:
  // 1. The 'number' ID of a question.
  // 2. The 'number' ID of the respective quiz to which this question belongs.
  // 3. The 'string' text of the question statement.
  // 4. An 'array' of four randomly shuffled answer instances.
  // 5. A 'boolean' indicating whether the question was answered correctly or not.
  private id: number;
  private quizId: number;
  private text: string;
  private shuffledAnswers: Answer[];
  private correct?: boolean;

  constructor(
    id: number,
    quizId: number,
    text: string,
    shuffledAnswers: Answer[],
    correct: boolean = false
  ) {
    this.id = id;
    this.quizId = quizId;
    this.text = text;
    this.shuffledAnswers = shuffledAnswers;
    this.correct = correct;
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

  get getCorrect() {
    return this.correct;
  }

  onClick(id: number) {
    const correct = this.shuffledAnswers.find(
      (answer) => answer.getId === id
    )?.getIsCorrect; // Returns the correct answer
    const flippedCards = this.shuffledAnswers.map((answer) => {
      // Flips the choosen card
      if (answer.getId === id) {
        return new Answer(
          answer.getId,
          answer.getQuestionId,
          answer.getText,
          true
        );
      }
      // Flips the correct card
      if (answer.getIsCorrect) {
        return new Answer(
          answer.getId,
          answer.getQuestionId,
          answer.getText,
          true
        );
      }
      return answer; // Do not flip the remaining cards
    });
    return new Question(
      this.getId,
      this.getQuizId,
      this.getText,
      flippedCards, // New shuffledAnswers is now the flipped cards
      correct
    );
  }

  static create(obj: QuestionAPI) {
    const answers = obj.get_shuffled_answers.map((answer) => {
      return Answer.create(answer);
    });
    return new Question(obj.id, obj.quizId, obj.text, answers, false);
  }
}
