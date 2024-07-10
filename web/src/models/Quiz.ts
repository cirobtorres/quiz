import MediaApp from "./MediaApp";

export default class Quiz {
  private id: number;
  private subject: string;
  private description: string;
  private cover: MediaApp;
  private slug: string;
  private theme: string;
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
    isPrivate: boolean,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.subject = subject;
    this.description = description;
    this.cover = cover;
    this.slug = slug;
    this.theme = theme;
    this.isPrivate = isPrivate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
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
      obj.is_private,
      obj.created_at,
      obj.updated_at
    );
  }
}
