export class UserSettings {
  private id: number;
  private quizIds: number[]; // Many to many field
  private quizSize: number; // Number of questions
  private countdown: number; // Time to choose an option
  private updatedAt: Date;

  constructor(
    id: number,
    quizIds: number[],
    quizSize: number,
    countdown: number,
    updatedAt: Date
  ) {
    this.id = id;
    this.quizIds = quizIds;
    this.quizSize = quizSize;
    this.countdown = countdown;
    this.updatedAt = updatedAt;
  }

  get getId() {
    return this.id;
  }

  get getQuizIds() {
    return this.quizIds;
  }

  get getQuizSize() {
    return this.quizSize;
  }

  get getCountdown() {
    return this.countdown;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  static create(obj: UserSettingsProps) {
    return new UserSettings(
      obj.id,
      obj.quiz,
      obj.quiz_size,
      obj.time_to_answer,
      new Date(obj.updated_at)
    );
  }
}
