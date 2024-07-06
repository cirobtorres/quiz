import { UserSettings } from "./UserSettings";

export class User {
  private id: number;
  private email: string;
  private username: string;
  private avatar?: string | null;
  private settings: UserSettings;
  private score: number;
  private scoreIds: number[];
  private lastScoreId: number;
  private isActive: boolean;
  private lastLogin: Date;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    id: number,
    email: string,
    username: string,
    avatar: string | null = null,
    settings: UserSettings,
    score: number,
    scoreIds: number[],
    lastScoreId: number,
    isActive: boolean,
    lastLogin: Date,
    createdAt: Date,
    updatedAt: Date
  ) {
    this.id = id;
    this.email = email;
    this.username = username;
    this.avatar = avatar;
    this.settings = settings;
    this.score = score;
    this.scoreIds = scoreIds;
    this.lastScoreId = lastScoreId;
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

  get getSettings() {
    return this.settings;
  }

  get getScore() {
    return this.score;
  }

  get getScoreIds() {
    return this.scoreIds;
  }

  get getLastScoreId() {
    return this.lastScoreId;
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

  set setEmail(email: string) {
    this.email = email;
  }

  set setUsername(username: string) {
    this.username = username;
  }

  set setAvatar(avatar: string | null) {
    this.avatar = avatar;
  }

  static create(obj: UserProps) {
    return new User(
      obj.id,
      obj.email,
      obj.username,
      obj.get_avatar_url,
      UserSettings.create(obj.settings),
      obj.get_score,
      obj.total_score,
      obj.get_last_score_id,
      obj.is_active,
      obj.last_login,
      new Date(obj.created_at),
      new Date(obj.updated_at)
    );
  }
}
