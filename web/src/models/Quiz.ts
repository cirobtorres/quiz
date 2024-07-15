import MediaApp from "./MediaApp";

export default class Quiz {
  private id: number;
  private subject: string;
  private description: string;
  private cover: MediaApp;
  private slug: string;
  private theme: string;
  private blocked: boolean;
  private isPrivate: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    subject: string,
    description: string,
    cover: MediaApp,
    slug: string,
    theme: string,
    blocked: boolean,
    isPrivate: boolean,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.cover = cover;
    this.slug = slug;
    this.theme = theme;
    this.blocked = blocked;
    this.isPrivate = isPrivate;
    this.createdAt = new Date(createdAt);
    this.updatedAt = new Date(updatedAt);
  }

  get getId() {
    return this.id;
  }

  get getSubject() {
    return this.subject;
  }

  get getDescription() {
    return this.description;
  }

  get getCover() {
    return this.cover;
  }

  get getSlug() {
    return this.slug;
  }

  get getTheme() {
    return this.theme;
  }

  get getBlocked() {
    return this.blocked;
  }

  get getIsPrivate() {
    return this.isPrivate;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  static create(obj: QuizProps) {
    return new Quiz(
      obj.id,
      obj.subject,
      obj.description,
      MediaApp.create(obj.cover),
      obj.slug,
      obj.theme,
      obj.blocked,
      obj.is_private,
      obj.created_at,
      obj.updated_at
    );
  }
}
