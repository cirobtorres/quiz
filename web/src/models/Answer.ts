export default class Answer {
  private id: number; // 1. The 'number' id of an Answer.
  private text: string; // 2. The 'string' text of the answer option.
  private isCorrect: boolean; // 3. A 'boolean' indicating if this answer option is a correct option for that question id.
  private flipped?: boolean; // 4. A 'boolean' indicating whether this answer option was flipped or not.

  constructor(
    id: number,
    text: string,
    isCorrect: boolean,
    flipped: boolean = false
  ) {
    this.id = id;
    this.text = text;
    this.isCorrect = isCorrect;
    this.flipped = flipped;
  }

  get getId() {
    return this.id;
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

  static create(obj: AnswerProps) {
    return new Answer(obj.id, obj.text, obj.is_correct);
  }
}
