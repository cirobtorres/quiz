export class User {
  private id: number;
  private email: string;
  private username: string;
  private avatar?: string | null;
  private score: number;
  private isActive: boolean;
  private lastLogin: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    avatar: string | null = null,
    score: number,
    isActive: boolean,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.avatar = avatar;
    this.score = score;
    this.isActive = isActive;
    this.lastLogin = lastLogin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  get getId() {
    return this.id;
  }

  get getEmail() {
    return this.email;
  }

  get getUsername() {
    return this.username;
  }

  get getAvatar() {
    return this.avatar;
  }

  get getScore() {
    return this.score;
  }

  get getIsActive() {
    return this.isActive;
  }

  get getLastLogin() {
    return this.lastLogin;
  }

  get getCreatedAt() {
    return this.createdAt;
  }

  get getUpdatedAt() {
    return this.updatedAt;
  }

  static create(obj: UserProps) {
    return new User(
      obj.id,
      obj.email,
      obj.username,
      obj.avatar,
      obj.get_total_score,
      obj.is_active,
      obj.last_login,
      obj.created_at,
      obj.updated_at
    );
  }
}
