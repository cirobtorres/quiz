export default class Answer {
  private id: number;
  private questionId: number;
  private text: string;
  private isCorrect: boolean;
  private flipped?: boolean;

  constructor(
    id: number,
    questionId: number,
    text: string,
    isCorrect: boolean,
    flipped: boolean = false
  ) {
    this.id = id;
    this.questionId = questionId;
    this.text = text;
    this.isCorrect = isCorrect;
    this.flipped = flipped;
  }

  get getId() {
    return this.id;
  }

  get getQuestionId() {
    return this.questionId;
  }

  get getText() {
    return this.text;
  }

  get getIsCorrect() {
    return this.isCorrect;
  }

  get getFlipped() {
    return this.flipped;
  }

  static create(obj: {
    id: number;
    questionId: number;
    text: string;
    isCorrect: boolean;
  }) {
    return new Answer(obj.id, obj.questionId, obj.text, obj.isCorrect);
  }
}
