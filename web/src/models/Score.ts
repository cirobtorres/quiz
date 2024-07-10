class PartialScore {
  private id: number;
  private quizId: number;
  private total: number;
  private corrects: number;
  private createdAt: Date;

  constructor(
    id: number,
    quizId: number,
    total: number,
    corrects: number,
    createdAt: Date
  ) {
    this.id = id;
    this.quizId = quizId;
    this.total = total;
    this.corrects = corrects;
    this.createdAt = createdAt;
  }

  get getId() {
    return this.id;
  }
  get getQuizId() {
    return this.quizId;
  }
  get getTotal() {
    return this.total;
  }
  get getCorrects() {
    return this.corrects;
  }
  get getCreatedAt() {
    return this.createdAt;
  }

  static create(obj: PartialScoreProps) {
    return new PartialScore(
      obj.id,
      obj.quiz,
      obj.total,
      obj.corrects,
      obj.created_at
    );
  }
}

export default class TotalScore {
  private id: number;
  private scores: PartialScoreProps[];
  private user: number;
  private scorePercentage: number;
  private totalQuestions: number;
  private correctAnswers: number;

  constructor(
    id: number,
    scores: PartialScoreProps[],
    user: number,
    scorePercentage: number,
    totalQuestions: number,
    correctAnswers: number
  ) {
    this.id = id;
    this.scores = scores;
    this.user = user;
    this.scorePercentage = scorePercentage;
    this.totalQuestions = totalQuestions;
    this.correctAnswers = correctAnswers;
  }

  get getId() {
    return this.id;
  }

  get getScores() {
    return this.scores;
  }

  get getUser() {
    return this.user;
  }

  get getScorePercentage() {
    return this.scorePercentage;
  }

  get getTotalQuestions() {
    return this.totalQuestions;
  }

  get getCorrectAnswers() {
    return this.correctAnswers;
  }

  static create(obj: TotalScoreProps) {
    return new TotalScore(
      obj.id,
      obj.scores,
      obj.user,
      obj.get_score_percentage,
      obj.get_total_questions,
      obj.get_correct_answers
    );
  }
}
